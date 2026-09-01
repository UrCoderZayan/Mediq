function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value === null || value === undefined || value === '') return [];
  return [value];
}

function pickFirst(values) {
  const list = asArray(values);
  return list.length ? String(list[0]).trim() : '';
}

function joinText(values) {
  const list = asArray(values)
    .map(v => String(v).trim())
    .filter(Boolean);
  return list.length ? list.join('; ') : '';
}

module.exports = async (req, res) => {
  const query = (req.query?.query || req.query?.q || '').trim();

  if (!query) {
    return res.status(400).json({
      error: 'Please enter a medicine or drug name to search.',
      results: []
    });
  }

  try {
    const apiUrl = `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(`openfda.brand_name:"${query}" OR openfda.generic_name:"${query}" OR active_ingredient:"${query}"`)}&limit=5`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`openFDA returned status ${response.status}`);
    }

    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results : [];

    const normalized = results.map((item) => {
      const openfda = item.openfda || {};
      const brandName = pickFirst(openfda.brand_name) || pickFirst(item.brand_name);
      const genericName = pickFirst(openfda.generic_name) || pickFirst(item.generic_name);
      const activeIngredients = joinText(item.active_ingredient || openfda.active_ingredient || item.inactive_ingredient);
      const purpose = joinText(item.indications_and_usage || item.purpose || openfda.indications_and_usage);
      const warnings = joinText(item.warnings || openfda.warnings);
      const adverseReactions = joinText(item.adverse_reactions || openfda.adverse_reactions);
      const manufacturerName = pickFirst(openfda.manufacturer_name) || pickFirst(item.manufacturer_name) || pickFirst(item.manufacturer);

      return {
        brand_name: brandName || 'Not available',
        generic_name: genericName || 'Not available',
        active_ingredients: activeIngredients || 'Not available',
        purpose: purpose || 'Not available',
        warnings: warnings || 'Not available',
        adverse_reactions: adverseReactions || 'Not available',
        manufacturer_name: manufacturerName || 'Not available',
        source: 'openFDA'
      };
    });

    return res.status(200).json({
      results: normalized,
      total: normalized.length,
      query
    });
  } catch (error) {
    console.error('openFDA medicine search failed:', error);
    return res.status(500).json({
      error: 'Unable to fetch medicine information right now. Please try again in a moment.',
      results: []
    });
  }
};
