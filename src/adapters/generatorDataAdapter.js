export function buildGeneratorData(masterConfig, masterData) {
  return Object.entries(masterConfig)
    .map(([categoryKey, category]) => {
      const tabsWithData = category.tabs
        .map((tab) => {
          const rows = masterData[tab.key] || [];
          const values = rows.map((row) => row[tab.field]).filter(Boolean);

          if (values.length === 0) return null;

          return {
            label: tab.label,
            options: values,
          };
        })
        .filter(Boolean);

      if (tabsWithData.length === 0) return null;

      return {
        key: categoryKey,
        label: category.label,
        // 🔥 KRUSIAL
        options:
          tabsWithData.length === 1 ? tabsWithData[0].options : tabsWithData,
      };
    })
    .filter(Boolean);
}
