import React, { useState } from "react";
import { FaChartBar, FaFont, FaIcons, FaShapes, FaTimes } from "react-icons/fa";
import TextsBlockPanel from "./DesignBlocksPanels/TextBlockPanel";
import ShapesBlockPanel from "./DesignBlocksPanels/ShapesBlockPanel";
import ElementsBlockPanel from "./DesignBlocksPanels/ElementsBlockPanel";
import ChartsBlockPanel from "./DesignBlocksPanels/ChartsBlockPanel";

interface IBlockCategories {
  id: string;
  name: string;
  icon: React.ReactNode;
  component?: React.ReactNode;
}

const blockCategories: IBlockCategories[] = [
  {
    id: "text",
    name: "Text",
    icon: <FaFont />,
    component: <TextsBlockPanel />,

  },
  {
    id: "shapes",
    name: "Shapes",
    icon: <FaShapes />,
    component: <ShapesBlockPanel />,
  
  },
  {
    id: "elements",
    name: "Elements",
    icon: <FaIcons />,
    component: <ElementsBlockPanel />,

  },
  {
    id: "charts",
    name: "Charts",
    icon: <FaChartBar />,
    component: <ChartsBlockPanel />,

  },
];


const DesignStudioSidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const activeBlockCategory = blockCategories.find(
    (cat) => cat.id === activeCategory
  );
  return (
    <>
      {/* Main Sidebar */}
      <aside className="w-16 bg-white shadow-md flex flex-col border-r border-gray-200 z-10">
        <div className="p-2 border-b border-gray-200 flex items-center justify-center h-16">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            D
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-3 px-2">
            {blockCategories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors duration-200 rounded-lg ${
                    activeCategory === category.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                  title={category.name}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <span className="text-xs leading-tight">{category.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Right Panel for Elements */}
      {activeCategory && activeBlockCategory && (
        <div className="w-72 bg-white shadow-md border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between h-16 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-gray-700">
                {activeBlockCategory.icon}
              </div>
              <span className="text-lg font-semibold text-gray-800">
                {activeBlockCategory.name}
              </span>
            </div>
            <div
              onClick={() => setActiveCategory(null)}
              role="button"
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              title="Close"
            >
              <FaTimes className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {activeBlockCategory.component}
          </div>
        </div>
      )}
    </>
  );
};

export default DesignStudioSidebar;
