import React, { useState, useEffect } from 'react';

// --- Type Definitions for Enhanced AI Opportunities with Numerical Scoring ---

// Define the type for numerical scores
type Score1To10 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// This type represents the data we need to input for a new opportunity
// overallRisk is omitted because it will be calculated
interface AiOpportunityInput {
  name: string;
  description: string;
  overallBusinessImpact: Score1To10;
  overallFeasibilityReadiness: Score1To10;
  costSavingsPotential: Score1To10;
  revenueGenerationPotential: Score1To10;
  efficiencyImprovement: Score1To10;
  customerEmployeeExperienceImprovement: Score1To10;
  alignmentWithAxiomObjectives: Score1To10;
  alignmentWithChildCompanyObjectives: Score1To10;
  dataQuality: Score1To10;
  technicalComplexity: Score1To10;
  internalExpertiseAvailability: Score1To10;
  quickWinPotential: boolean;
  userAdoptionLikelihood: Score1To10;
  modelBiasRisk: Score1To10;
  costVsRoiAssessment: Score1To10;
  aiTechnologyType: 'Generative AI' | 'Machine Learning' | 'Natural Language Processing' | 'Computer Vision' | 'Robotics Process Automation' | 'Combination' | 'Search';
}

// This is the full opportunity type, including the calculated overallRisk and ID
interface AiOpportunity extends AiOpportunityInput {
  id: number;
  overallRisk: Score1To10;
}


// --- Sample AI Opportunities (overallRisk is now excluded from the initial data) ---
// We use a separate array for the *raw* data that doesn't have overallRisk
const initialRawAiOpportunities: Omit<AiOpportunity, 'id' | 'overallRisk'>[] = [
  
];

// --- Risk Calculation Logic (unchanged from previous iteration) ---
const riskWeights = {
  modelBiasRisk: 0.4,
  costVsRoiAssessment: 0.3,
  technicalComplexity: 0.3,
};

const calculateOverallRisk = (opportunity: Omit<AiOpportunity, 'id' | 'overallRisk'>): Score1To10 => {
  let weightedSum = 0;
  weightedSum += opportunity.modelBiasRisk * riskWeights.modelBiasRisk;
  weightedSum += opportunity.costVsRoiAssessment * riskWeights.costVsRoiAssessment;
  weightedSum += opportunity.technicalComplexity * riskWeights.technicalComplexity;

  let calculatedScore = Math.round(weightedSum);
  if (calculatedScore < 1) calculatedScore = 1;
  if (calculatedScore > 10) calculatedScore = 10;
  return calculatedScore as Score1To10;
};


// --- React Component ---
function App() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<AiOpportunity | null>(null);
  const [opportunities, setOpportunities] = useState<AiOpportunity[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Initial form state (all fields set to a default, e.g., 5 or false)
  const initialFormState: AiOpportunityInput = {
    name: '',
    description: '',
    overallBusinessImpact: 5,
    overallFeasibilityReadiness: 5,
    costSavingsPotential: 5,
    revenueGenerationPotential: 5,
    efficiencyImprovement: 5,
    customerEmployeeExperienceImprovement: 5,
    alignmentWithAxiomObjectives: 5,
    alignmentWithChildCompanyObjectives: 5,
    dataQuality: 5,
    technicalComplexity: 5,
    internalExpertiseAvailability: 5,
    quickWinPotential: false,
    userAdoptionLikelihood: 5,
    modelBiasRisk: 5,
    costVsRoiAssessment: 5,
    aiTechnologyType: 'Machine Learning', // Default to one type
  };
  const [formData, setFormData] = useState<AiOpportunityInput>(initialFormState);


  // Calculate overallRisk for initial opportunities when the component mounts
  useEffect(() => {
    const opportunitiesWithCalculatedRisk = initialRawAiOpportunities.map((op, index) => ({
      ...op,
      id: index + 1, // Assign initial IDs
      overallRisk: calculateOverallRisk(op),
    }));
    setOpportunities(opportunitiesWithCalculatedRisk);
  }, []);

  // Helper to get next available ID (simple increment for demonstration)
  const getNextId = (): number => {
    const maxId = opportunities.reduce((max, op) => Math.max(max, op.id), 0);
    return maxId + 1;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value),
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure numeric values are actually numbers
    const parsedFormData = {
        ...formData,
        overallBusinessImpact: parseInt(String(formData.overallBusinessImpact)) as Score1To10,
        overallFeasibilityReadiness: parseInt(String(formData.overallFeasibilityReadiness)) as Score1To10,
        costSavingsPotential: parseInt(String(formData.costSavingsPotential)) as Score1To10,
        revenueGenerationPotential: parseInt(String(formData.revenueGenerationPotential)) as Score1To10,
        efficiencyImprovement: parseInt(String(formData.efficiencyImprovement)) as Score1To10,
        customerEmployeeExperienceImprovement: parseInt(String(formData.customerEmployeeExperienceImprovement)) as Score1To10,
        alignmentWithAxiomObjectives: parseInt(String(formData.alignmentWithAxiomObjectives)) as Score1To10,
        alignmentWithChildCompanyObjectives: parseInt(String(formData.alignmentWithChildCompanyObjectives)) as Score1To10,
        dataQuality: parseInt(String(formData.dataQuality)) as Score1To10,
        technicalComplexity: parseInt(String(formData.technicalComplexity)) as Score1To10,
        internalExpertiseAvailability: parseInt(String(formData.internalExpertiseAvailability)) as Score1To10,
        userAdoptionLikelihood: parseInt(String(formData.userAdoptionLikelihood)) as Score1To10,
        modelBiasRisk: parseInt(String(formData.modelBiasRisk)) as Score1To10,
        costVsRoiAssessment: parseInt(String(formData.costVsRoiAssessment)) as Score1To10,
    };

    const newOverallRisk = calculateOverallRisk(parsedFormData);

    const newOpportunity: AiOpportunity = {
      id: getNextId(),
      ...parsedFormData,
      overallRisk: newOverallRisk,
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    setFormData(initialFormState); // Reset form
    setIsFormVisible(false); // Hide form after submission
  };


  // --- Helper to convert 1-10 score to 'Low', 'Medium', 'High' for quadrant mapping ---
  const scoreToCategory = (score: Score1To10): 'Low' | 'Medium' | 'High' => {
    if (score >= 7) return 'High';
    if (score >= 4) return 'Medium';
    return 'Low';
  };

  // --- Helper to convert 1-10 risk score to 'Low', 'Medium', 'High' for display ---
  const riskScoreToCategory = (score: Score1To10): 'Low' | 'Medium' | 'High' => {
    if (score <= 3) return 'Low'; // 1-3 is Low Risk
    if (score <= 7) return 'Medium'; // 4-7 is Medium Risk
    return 'High'; // 8-10 is High Risk
  };

  // Mapping for impact and feasibility to grid positions
  const impactMap: Record<'Low' | 'Medium' | 'High', number> = {
    'Low': 2, // Bottom row
    'Medium': 1, // Middle row
    'High': 0, // Top row
  };

  const feasibilityMap: Record<'Low' | 'Medium' | 'High', number> = {
    'Low': 2, // Right column
    'Medium': 1, // Middle column
    'High': 0, // Left column
  };

  // Quadrant labels and colors
  interface QuadrantInfo {
    label: string;
    bgColor: string;
  }

  const quadrantInfo: Record<string, QuadrantInfo> = {
  '0-0': { label: '1. High Impact, High Feasibility', bgColor: 'bg-green-50/70' },
  '0-1': { label: '2. High Impact, Medium Feasibility', bgColor: 'bg-blue-50/70' },
  '0-2': { label: '3. High Impact, Low Feasibility', bgColor: 'bg-purple-50/70' },
  '1-0': { label: '4. Medium Impact, High Feasibility', bgColor: 'bg-teal-50/70' },
  '1-1': { label: '5. Medium Impact, Medium Feasibility', bgColor: 'bg-orange-50/70' },
  '1-2': { label: '6. Medium Impact, Low Feasibility', bgColor: 'bg-red-50/70' },
  '2-0': { label: '7. Low Impact, High Feasibility', bgColor: 'bg-gray-50/70' },
  '2-1': { label: '8. Low Impact, Medium Feasibility', bgColor: 'bg-gray-100/70' },
  '2-2': { label: '9. Low Impact, Low Feasibility', bgColor: 'bg-gray-200/70' },
};

  // Group opportunities by quadrant key using the category mappings
  const groupedOpportunities = opportunities.reduce((acc: Record<string, AiOpportunity[]>, op) => {
    const impactCategory = scoreToCategory(op.overallBusinessImpact);
    const feasibilityCategory = scoreToCategory(op.overallFeasibilityReadiness);
    const quadrantKey = `${impactMap[impactCategory]}-${feasibilityMap[feasibilityCategory]}`;
    if (!acc[quadrantKey]) {
      acc[quadrantKey] = [];
    }
    acc[quadrantKey].push(op);
    return acc;
  }, {});

  // Function to get text color based on *numerical* risk score
  const getRiskTextColor = (riskScore: Score1To10): string => {
    if (riskScore >= 8) return 'text-red-600'; // High Risk
    if (riskScore >= 4) return 'text-orange-600'; // Medium Risk
    return 'text-green-600'; // Low Risk
  };

  // Helper to format 'boolean' values for display
  const formatBoolean = (value: boolean): string => (value ? 'Yes' : 'No');

  // Utility to create a number input field with a label and range
  const NumberInput: React.FC<{ label: string; name: keyof AiOpportunityInput; value: Score1To10; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, value, onChange }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label} (1-10):</label>
      <input
        type="number"
        id={name}
        name={name}
        min="1"
        max="10"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8 font-inter text-gray-800 flex flex-col items-center">
      {/* Tailwind CSS and Font imports for preview environment */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8 rounded-lg p-2 shadow-md">
        AI Opportunities Prioritization Matrix
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl">
        This matrix categorizes potential AI integrations based on their estimated **overall business impact** and **overall feasibility/readiness**,
        with detailed lists within each prioritization quadrant. All criteria are scored on a **1-10 scale**. Overall Risk is now **calculated** based on detailed risk factors. Click on an opportunity for a granular breakdown.
      </p>

      {/* Button to toggle form visibility */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold mb-10 transform hover:scale-105"
      >
        {isFormVisible ? 'Hide Input Form' : 'Add New AI Opportunity'}
      </button>

      {/* New Opportunity Input Form */}
      {isFormVisible && (
        <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl mb-10 border border-purple-200 animate-fade-in-down">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Add New Opportunity</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Opportunity Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <h3 className="col-span-full text-lg font-semibold text-gray-700 pt-4 border-t">Overall & Detailed Impact:</h3>
              <NumberInput label="Overall Business Impact" name="overallBusinessImpact" value={formData.overallBusinessImpact} onChange={handleInputChange} />
              <NumberInput label="Cost Savings Potential" name="costSavingsPotential" value={formData.costSavingsPotential} onChange={handleInputChange} />
              <NumberInput label="Revenue Generation Potential" name="revenueGenerationPotential" value={formData.revenueGenerationPotential} onChange={handleInputChange} />
              <NumberInput label="Efficiency Improvement" name="efficiencyImprovement" value={formData.efficiencyImprovement} onChange={handleInputChange} />
              <NumberInput label="Customer/Employee Experience" name="customerEmployeeExperienceImprovement" value={formData.customerEmployeeExperienceImprovement} onChange={handleInputChange} />
              <NumberInput label="Alignment w/ Axiom Objectives" name="alignmentWithAxiomObjectives" value={formData.alignmentWithAxiomObjectives} onChange={handleInputChange} />
              <NumberInput label="Alignment w/ Child Company Objectives" name="alignmentWithChildCompanyObjectives" value={formData.alignmentWithChildCompanyObjectives} onChange={handleInputChange} />

              <h3 className="col-span-full text-lg font-semibold text-gray-700 pt-4 border-t">Overall & Detailed Feasibility:</h3>
              <NumberInput label="Overall Feasibility/Readiness" name="overallFeasibilityReadiness" value={formData.overallFeasibilityReadiness} onChange={handleInputChange} />
              <NumberInput label="Data Quality" name="dataQuality" value={formData.dataQuality} onChange={handleInputChange} />
              <NumberInput label="Technical Complexity" name="technicalComplexity" value={formData.technicalComplexity} onChange={handleInputChange} />
              <NumberInput label="Internal Expertise Availability" name="internalExpertiseAvailability" value={formData.internalExpertiseAvailability} onChange={handleInputChange} />
              <NumberInput label="User Adoption Likelihood" name="userAdoptionLikelihood" value={formData.userAdoptionLikelihood} onChange={handleInputChange} />
              <div>
                <label htmlFor="quickWinPotential" className="block text-sm font-medium text-gray-700">Quick Win Potential:</label>
                <input
                  type="checkbox"
                  id="quickWinPotential"
                  name="quickWinPotential"
                  checked={formData.quickWinPotential}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              <h3 className="col-span-full text-lg font-semibold text-gray-700 pt-4 border-t">Detailed Risk Factors (Calculate Overall Risk):</h3>
              <NumberInput label="Model Bias Risk" name="modelBiasRisk" value={formData.modelBiasRisk} onChange={handleInputChange} />
              <NumberInput label="Cost vs. ROI Assessment" name="costVsRoiAssessment" value={formData.costVsRoiAssessment} onChange={handleInputChange} />

              <div className="col-span-full">
                <label htmlFor="aiTechnologyType" className="block text-sm font-medium text-gray-700">AI Technology Type:</label>
                <select
                  id="aiTechnologyType"
                  name="aiTechnologyType"
                  value={formData.aiTechnologyType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                >
                  <option value="Generative AI">Generative AI</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Natural Language Processing">Natural Language Processing</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Robotics Process Automation">Robotics Process Automation</option>
                  <option value="Combination">Combination</option>
                  <option value="Search">Search</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Opportunity to Matrix
              </button>
            </div>
          </form>
        </div>
      )}


      {/* Legend for Impact, Feasibility, and Risk (unchanged) */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-10 w-full max-w-4xl space-y-4 md:space-y-0 md:space-x-8">
        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Impact Legend (1-10):</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><span className="font-bold">High:</span> 7-10 (Significant contribution)</li>
            <li><span className="font-bold">Medium:</span> 4-6 (Noticeable benefits)</li>
            <li><span className="font-bold">Low:</span> 1-3 (Minor improvements)</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Feasibility Legend (1-10):</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><span className="font-bold">High:</span> 7-10 (Data ready, expertise exists)</li>
            <li><span className="font-bold">Medium:</span> 4-6 (Some effort needed)</li>
            <li><span className="font-bold">Low:</span> 1-3 (Significant gaps/complexity)</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Risk Legend (1-10):</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li><span className="font-bold text-green-600">Low Risk:</span> 1-3 (Minimal potential downsides)</li>
            <li><span className="font-bold text-orange-600">Medium Risk:</span> 4-7 (Manageable risks)</li>
            <li><span className="font-bold text-red-600">High Risk:</span> 8-10 (Significant potential downsides)</li>
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
                        <span className={`font-bold ${getRiskTextColor(op.overallRisk)}`}>
                          {op.overallRisk} ({riskScoreToCategory(op.overallRisk)})
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
        <div className="absolute bottom-0 left-0 w-full text-center py-2 text-lg font-bold text-gray-700 pointer-events-none">Overall Feasibility/Readiness (1-10)</div>
        <div className="absolute bottom-0 left-[16.67%] w-1/3 text-center text-sm text-gray-500 transform -translate-x-1/2 translate-y-6 pointer-events-none">High (7-10)</div>
        <div className="absolute bottom-0 left-[50%] w-1/3 text-center text-sm text-gray-500 transform -translate-x-1/2 translate-y-6 pointer-events-none">Medium (4-6)</div>
        <div className="absolute bottom-0 left-[83.33%] w-1/3 text-center text-sm text-gray-500 transform -translate-x-1/2 translate-y-6 pointer-events-none">Low (1-3)</div>


        {/* Y-axis Label (Impact) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-left py-2 text-lg font-bold text-gray-700 transform -translate-x-full translate-y-full">Overall Business Impact (1-10)</div>
        <div className="absolute top-[16.67%] left-0 h-1/3 w-full text-right pr-2 text-sm text-gray-500 transform -rotate-90 origin-top-left -translate-y-full -translate-x-full pointer-events-none">High (7-10)</div>
        <div className="absolute top-[50%] left-0 h-1/3 w-full text-right pr-2 text-sm text-gray-500 transform -rotate-90 origin-top-left -translate-y-full -translate-x-full pointer-events-none">Medium (4-6)</div>
        <div className="absolute top-[83.33%] left-0 h-1/3 w-full text-right pr-2 text-sm text-gray-500 transform -rotate-90 origin-top-left -translate-y-full -translate-x-full pointer-events-none">Low (1-3)</div>
      </div>

      {/* Opportunity Details Modal (unchanged) */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOpportunity(null)} // Close on background click
        >
          <div
            className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {selectedOpportunity.name}
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Overall Business Impact:</span> {selectedOpportunity.overallBusinessImpact} ({scoreToCategory(selectedOpportunity.overallBusinessImpact)})
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Overall Feasibility/Readiness:</span> {selectedOpportunity.overallFeasibilityReadiness} ({scoreToCategory(selectedOpportunity.overallFeasibilityReadiness)})
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Overall Risk Rating:</span>{' '}
              <span className={`font-bold ${getRiskTextColor(selectedOpportunity.overallRisk)}`}>
                {selectedOpportunity.overallRisk} ({riskScoreToCategory(selectedOpportunity.overallRisk)})
              </span>
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-3">Detailed Breakdown:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-6">
              {/* Business Impact Factors */}
              <p><span className="font-semibold">Cost Savings Potential:</span> {selectedOpportunity.costSavingsPotential}</p>
              <p><span className="font-semibold">Revenue Generation Potential:</span> {selectedOpportunity.revenueGenerationPotential}</p>
              <p><span className="font-semibold">Efficiency Improvement:</span> {selectedOpportunity.efficiencyImprovement}</p>
              <p><span className="font-semibold">Customer/Employee Experience:</span> {selectedOpportunity.customerEmployeeExperienceImprovement}</p>
              <p><span className="font-semibold">Alignment with Axiom Objectives:</span> {selectedOpportunity.alignmentWithAxiomObjectives}</p>
              <p><span className="font-semibold">Alignment with Child Company Objectives:</span> {selectedOpportunity.alignmentWithChildCompanyObjectives}</p>

              {/* Feasibility/Readiness Factors */}
              <p><span className="font-semibold">Data Quality:</span> {selectedOpportunity.dataQuality}</p>
              <p><span className="font-semibold">Technical Complexity:</span> {selectedOpportunity.technicalComplexity}</p>
              <p><span className="font-semibold">Internal Expertise:</span> {selectedOpportunity.internalExpertiseAvailability}</p>
              <p><span className="font-semibold">Quick Win Potential:</span> {formatBoolean(selectedOpportunity.quickWinPotential)}</p>
              <p><span className="font-semibold">User Adoption Likelihood:</span> {selectedOpportunity.userAdoptionLikelihood}</p>

              {/* Risk Factors */}
              <p><span className="font-semibold">Model Bias Risk:</span> {selectedOpportunity.modelBiasRisk}</p>
              <p><span className="font-semibold">Cost vs. ROI Assessment:</span> {selectedOpportunity.costVsRoiAssessment}</p>

              {/* AI Technology Type */}
              <p className="col-span-1 sm:col-span-2"><span className="font-semibold">AI Technology Type:</span> {selectedOpportunity.aiTechnologyType}</p>
            </div>

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