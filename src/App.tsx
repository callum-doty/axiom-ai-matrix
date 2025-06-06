import React, { useState } from 'react';

// Define the type for an individual AI opportunity
interface AiOpportunity {
  id: number;
  name: string;
  impact: 'High' | 'Medium' | 'Low';
  feasibility: 'High' | 'Medium' | 'Low';
  riskRating: 'High' | 'Medium' | 'Low';
  description: string;
}

// Define the AI opportunities with their impact, feasibility, and risk ratings
const aiOpportunities: AiOpportunity[] = [
  { id: 1, name: 'Automated Text Extraction from PDFs', impact: 'High', feasibility: 'High', riskRating: 'Low', description: 'Core objective, enabling intelligent search; high data quality, mature tech, low bias risk.' },
  { id: 2, name: 'Classification Model for Design Elements', impact: 'High', feasibility: 'High', riskRating: 'Medium', description: 'Core to organizing assets; good data, but potential for subtle bias in classification categories.' },
  { id: 3, name: 'AI-Powered Predictive Asset Popularity', impact: 'High', feasibility: 'Medium', riskRating: 'Medium', description: 'Analyze historical usage to suggest relevant assets; data integration is complex, risk of model drift.' },
  { id: 4, name: 'Automated Metadata Generation', impact: 'High', feasibility: 'Medium', riskRating: 'Medium', description: 'AI automatically tags assets with detailed, consistent metadata; requires robust CV/NLP, potential for inaccuracies or ethical tagging issues.' },
  { id: 5, name: 'Generative AI for Initial Design Concepts', impact: 'High', feasibility: 'Low', riskRating: 'High', description: 'Highly complex, requiring advanced GenAI models; limited training data, high risk of inconsistent output or ethical concerns.' },
  { id: 6, name: 'AI for Cross-Platform Design Consistency Audit', impact: 'High', feasibility: 'Low', riskRating: 'High', description: 'Identify and flag inconsistencies in branding elements; technically challenging, potential for false positives/negatives leading to user distrust.' },
  { id: 7, name: 'AI-Enhanced Search Query Understanding', impact: 'Medium', feasibility: 'High', riskRating: 'Low', description: 'NLP to better interpret complex user queries; relatively straightforward implementation, low user adoption risk if benefits are clear.' },
  { id: 8, name: 'Automated Reporting on Asset Usage', impact: 'Medium', feasibility: 'High', riskRating: 'Low', description: 'AI analyzes usage logs to generate reports; data is available, direct efficiency gain, low risk.' },
  { id: 9, name: 'AI-Assisted User Onboarding', impact: 'Medium', feasibility: 'Medium', riskRating: 'Medium', description: 'AI-powered chatbot or tutorial system; content creation is key, user adoption depends on perceived helpfulness.' },
  { id: 10, name: 'Automated Rights & Licensing Tagging', impact: 'Medium', feasibility: 'Medium', riskRating: 'High', description: 'NLP to scan associated documents and tag assets; high legal/compliance risk if tagging is incorrect, requires robust accuracy and human oversight.' },
  { id: 11, name: 'AI for Sentiment Analysis of Design Feedback', impact: 'Medium', feasibility: 'Low', riskRating: 'Medium', description: 'Analyze written client feedback for sentiment trends; subjectivity in sentiment, data quality for nuances, potential for misinterpretation.' },
  { id: 12, name: 'Automated Daily System Health Checks', impact: 'Low', feasibility: 'High', riskRating: 'Low', description: 'Simple RPA/scripting for system uptime; minimal complexity, low risk.' },
  { id: 13, name: 'AI-Generated Welcome Emails for New Team Members', impact: 'Low', feasibility: 'Medium', riskRating: 'Low', description: 'Basic GenAI for HR; low impact on core business, but simple to implement with minimal risk.' },
  { id: 14, name: 'AI for Predicting Office Supply Needs', impact: 'Low', feasibility: 'Low', riskRating: 'Low', description: 'Irrelevant to core asset management business; no significant risks or benefits in this context.' },
];

function App() {
  // Use state with type definition for selectedOpportunity
  const [selectedOpportunity, setSelectedOpportunity] = useState<AiOpportunity | null>(null);

  // Define mapping for impact and feasibility to grid positions
  const impactMap: Record<AiOpportunity['impact'], number> = {
    'Low': 2, // Bottom row
    'Medium': 1, // Middle row
    'High': 0, // Top row
  };

  const feasibilityMap: Record<AiOpportunity['feasibility'], number> = {
    'Low': 2, // Right column
    'Medium': 1, // Middle column
    'High': 0, // Left column
  };

  // Quadrant labels for visual clarity and for grouping
  interface QuadrantInfo {
    label: string;
    bgColor: string;
  }

  const quadrantInfo: Record<string, QuadrantInfo> = {
    '0-0': { label: '1. Quick Wins / Must-Dos', bgColor: 'bg-green-50/70' },
    '0-1': { label: '2. Strategic Investments', bgColor: 'bg-blue-50/70' },
    '0-2': { label: '3. Long-Term Bets', bgColor: 'bg-purple-50/70' },
    '1-0': { label: '4. Good Candidates', bgColor: 'bg-teal-50/70' },
    '1-1': { label: '5. Evaluate Further', bgColor: 'bg-orange-50/70' },
    '1-2': { label: '6. Reconsider / Park', bgColor: 'bg-red-50/70' },
    '2-0': { label: '7. Low Priority (Easier)', bgColor: 'bg-gray-50/70' },
    '2-1': { label: '8. Low Priority (Moderate)', bgColor: 'bg-gray-100/70' },
    '2-2': { label: '9. Avoid / Sunset', bgColor: 'bg-gray-200/70' },
  };

  // Group opportunities by quadrant key
  const groupedOpportunities = aiOpportunities.reduce((acc: Record<string, AiOpportunity[]>, op) => {
    const quadrantKey = `${impactMap[op.impact]}-${feasibilityMap[op.feasibility]}`;
    if (!acc[quadrantKey]) {
      acc[quadrantKey] = [];
    }
    acc[quadrantKey].push(op);
    return acc;
  }, {});

  // Function to get text color based on risk rating
  const getRiskTextColor = (riskRating: AiOpportunity['riskRating']): string => {
    switch (riskRating) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8 font-inter text-gray-800 flex flex-col items-center">
      {/* Tailwind CSS and Font imports for preview environment */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8 rounded-lg p-2 shadow-md">
        AI Opportunities Prioritization Matrix
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl">
        This matrix categorizes potential AI integrations based on their estimated business impact and feasibility,
        with detailed lists within each prioritization quadrant.
      </p>

      {/* Legend for Impact, Feasibility, and Risk */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-10 w-full max-w-4xl space-y-4 md:space-y-0 md:space-x-8">
        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Impact Legend:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><span className="font-bold">High Impact:</span> Significant contribution to strategic objectives.</li>
            <li><span className="font-bold">Medium Impact:</span> Noticeable but not transformative benefits.</li>
            <li><span className="font-bold">Low Impact:</span> Minor improvements, less alignment with strategy.</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Feasibility Legend:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><span className="font-bold">High Feasibility:</span> Data ready, expertise exists, low complexity.</li>
            <li><span className="font-bold">Medium Feasibility:</span> Some data/effort needed, moderate complexity.</li>
            <li><span className="font-bold">Low Feasibility:</span> Significant data gaps, high complexity, rare expertise.</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Risk Legend:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><span className="font-bold text-green-600">Low Risk:</span> Minimal potential downsides.</li>
            <li><span className="font-bold text-orange-600">Medium Risk:</span> Manageable risks, require attention.</li>
            <li><span className="font-bold text-red-600">High Risk:</span> Significant potential downsides, careful consideration.</li>
          </ul>
        </div>
      </div>

      {/* The Matrix Grid */}
      <div className="relative w-full max-w-4xl aspect-[4/3] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300 grid grid-cols-3 grid-rows-3">
        {/* Quadrant Cells with Lists */}
        {Object.entries(quadrantInfo).map(([key, info]) => {
          const [row, col] = key.split('-').map(Number);
          const opportunitiesInQuadrant = groupedOpportunities[key] || [];

          return (
            <div
              key={key}
              className={`relative flex flex-col p-4 border border-gray-200 overflow-auto ${info.bgColor}`}
              style={{ gridRow: row + 1, gridColumn: col + 1 }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-2 sticky top-0 bg-inherit pb-1 z-10">
                {info.label}
              </h3>
              <ul className="space-y-2 text-sm">
                {opportunitiesInQuadrant.length > 0 ? (
                  opportunitiesInQuadrant.map((op: AiOpportunity) => (
                    <li
                      key={op.id}
                      className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
                      onClick={() => setSelectedOpportunity(op)}
                    >
                      <p className="font-semibold text-gray-800">{op.name}</p>
                      <p className="text-gray-600 text-xs mt-1">
                        Risk:{' '}
                        <span className={`font-bold ${getRiskTextColor(op.riskRating)}`}>
                          {op.riskRating}
                        </span>
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic text-xs">No opportunities here.</li>
                )}
              </ul>
            </div>
          );
        })}

        {/* X-axis Label (Feasibility) */}
        <div className="absolute bottom-0 left-0 w-full text-center py-2 text-lg font-bold text-gray-700 pointer-events-none">Feasibility</div>
        <div className="absolute bottom-0 left-[16.67%] w-1/3 text-center text-sm text-gray-500 transform -translate-x-1/2 translate-y-6 pointer-events-none">High</div>
        <div className="absolute bottom-0 left-[50%] w-1/3 text-center text-sm text-gray-500 transform -translate-x-1/2 translate-y-6 pointer-events-none">Medium</div>
        <div className="absolute bottom-0 left-[83.33%] w-1/3 text-center text-sm text-gray-500 transform -translate-x-1/2 translate-y-6 pointer-events-none">Low</div>


        {/* Y-axis Label (Impact) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-left py-2 text-lg font-bold text-gray-700 transform -translate-x-full translate-y-full">Impact</div>
        <div className="absolute top-[16.67%] left-0 h-1/3 w-full text-right pr-2 text-sm text-gray-500 transform -rotate-90 origin-top-left -translate-y-full -translate-x-full pointer-events-none">High</div>
        <div className="absolute top-[50%] left-0 h-1/3 w-full text-right pr-2 text-sm text-gray-500 transform -rotate-90 origin-top-left -translate-y-full -translate-x-full pointer-events-none">Medium</div>
        <div className="absolute top-[83.33%] left-0 h-1/3 w-full text-right pr-2 text-sm text-gray-500 transform -rotate-90 origin-top-left -translate-y-full -translate-x-full pointer-events-none">Low</div>
      </div>

      {/* Opportunity Details Modal */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOpportunity(null)} // Close on background click
        >
          <div
            className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {selectedOpportunity.name}
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Impact:</span> {selectedOpportunity.impact}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Feasibility:</span> {selectedOpportunity.feasibility}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Risk Rating:</span>{' '}
              <span className={`font-bold ${
                selectedOpportunity.riskRating === 'High' ? 'text-red-600' :
                selectedOpportunity.riskRating === 'Medium' ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {selectedOpportunity.riskRating}
              </span>
            </p>
            <p className="text-gray-600 italic mb-6">
              {selectedOpportunity.description}
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setSelectedOpportunity(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
