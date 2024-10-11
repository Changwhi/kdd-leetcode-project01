"use client";

interface Tab {
  name: string;
  key: string;
}

interface AccountNavBarProps {
  activeTab: string;
  setActiveTab: (key: string) => void;
  tabs: Tab[];
}

export default function AccountNavBar({
  activeTab,
  setActiveTab,
  tabs,
}: AccountNavBarProps) {
  return (
    <div className="w-28 p-4 border-r">
      <ul className="space-y-4">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              onClick={() => setActiveTab(tab.key)}
              className={`block py-2 px-4 hover:text-black relative ${
                activeTab === tab.key ? "font-bold text-black" : "text-gray-800"
              }`}
            >
              {activeTab === tab.key && (
                <span className="absolute left-0 top-0 h-full w-1 bg-black"></span>
              )}
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
