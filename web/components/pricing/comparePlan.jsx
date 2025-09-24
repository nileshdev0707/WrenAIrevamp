import React from "react";

export default function ComparePlan({ tiers, selectedPlan }) {

  return (
    <div>
       {tiers?.length > 0 && (
          <section className="max-w-6xl mx-auto py-10">
            <h2 className="text-4xl font-medium text-center">Compare Plans</h2>
            <div className="mt-6 overflow-x-auto">
              {(() => {
                // Parse features grouped by category
                const parsed = tiers.map((t) => ({
                  name: t.name,
                  featuresByCategory: Object.entries(
                     selectedPlan === "Cloud" ? t.compareFeatures || {} : t.selfHostedCompareFeatures || {}
                  ).map(([category, feats]) => [
                    category,
                    Array.isArray(feats)
                      ? feats.map((f) => [
                          Object.keys(f)[0],
                          Object.values(f)[0],
                        ])
                      : Object.entries(feats),
                  ]),
                }));

                return (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th />
                        {parsed.map((p, idx) => (
                          <th
                            key={idx}
                            className="p-4 text-lg font-semibold text-gray-700 text-center"
                          >
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {parsed[0].featuresByCategory.map(
                        ([category, feats], catIdx) => (
                          <React.Fragment key={catIdx}>
                            {/* Category Header Row */}
                            <tr className="bg-[#F7FBFE] border-b border-blue-500">
                              <td
                                colSpan={parsed.length + 1}
                                className="px-4 py-2 text-sm font-bold text-blue-600"
                              >
                                {category}
                              </td>
                            </tr>
                            {/* Features Rows */}
                            {feats.map(([f], featIdx) => (
                              <tr key={`${catIdx}-${featIdx}`}>
                                <td className="p-4 text-sm text-gray-700">
                                  {f}
                                </td>
                                {parsed.map((p, j) => {
                                  const featList =
                                    p.featuresByCategory.find(
                                      ([c]) => c === category
                                    )?.[1] || [];
                                  const entry = featList.find(([k]) => k === f);
                                  const val = entry ? entry[1] : false;
                                  return (
                                    <td
                                      key={`${catIdx}-${featIdx}-${j}`}
                                      className="p-4 text-center text-sm"
                                    >
                                      {val === true ? (
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                                          ✓
                                        </span>
                                      ) : (
                                        <span className="text-gray-700">
                                          {val}
                                        </span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </React.Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                );
              })()}
            </div>
          </section>
        )}
    </div>
  );
}
