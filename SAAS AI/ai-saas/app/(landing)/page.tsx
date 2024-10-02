"use client";

import React, { useState } from 'react';
import { MessageSquare, Compass, Box, Sun, Globe, Menu, Plus, X, Search, Database, BookOpen, CircleDot, Users, ThumbsUp, ThumbsDown, Volume2, Send } from 'lucide-react';

type SidebarItem = 'Chat' | 'Explore' | 'Construct App';
type TabType = 'All Apps' | 'Published' | 'Unpublished';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

interface NavButtonProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

interface AppCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  lastUpdate: string;
}

interface ModalOptionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
}

const DBGPTAppInterface: React.FC = () => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<SidebarItem>('Chat');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<TabType>('All Apps');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <img src="/api/placeholder/120/40" alt="DB-GPT Logo" className="mb-6" />
          <nav>
            <NavItem icon={<MessageSquare />} text="Chat" active={selectedSidebarItem === 'Chat'} onClick={() => setSelectedSidebarItem('Chat')} />
            <NavItem icon={<Compass />} text="Explore" active={selectedSidebarItem === 'Explore'} onClick={() => setSelectedSidebarItem('Explore')} />
            <NavItem icon={<Box />} text="Construct App" active={selectedSidebarItem === 'Construct App'} onClick={() => setSelectedSidebarItem('Construct App')} />
          </nav>
        </div>
        <div className="absolute bottom-4 left-4">
          <NavItem icon={<Sun />} text="dbgpt" />
          <div className="flex mt-2">
            <button className="p-2 hover:bg-gray-200 rounded"><Globe size={20} /></button>
            <button className="p-2 hover:bg-gray-200 rounded"><Menu size={20} /></button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedSidebarItem === 'Chat' ? (
          <ChatInterface />
        ) : (
          <>
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm p-4">
              <ul className="flex space-x-6">
                <NavButton icon={<Box />} text="App" active />
                <NavButton icon={<Database />} text="AWEL Flow" />
                <NavButton icon={<CircleDot />} text="Models" />
                <NavButton icon={<Database />} text="Database" />
                <NavButton icon={<BookOpen />} text="Knowledge" />
                <NavButton icon={<MessageSquare />} text="Prompt" />
                <NavButton icon={<Users />} text="DBGPTS Community" />
              </ul>
            </nav>

            {/* App Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button 
                    className={`px-4 py-2 rounded-full ${selectedTab === 'All Apps' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedTab('All Apps')}
                  >
                    All Apps
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full ${selectedTab === 'Published' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedTab('Published')}
                  >
                    Published
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full ${selectedTab === 'Unpublished' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedTab('Unpublished')}
                  >
                    Unpublished
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <input
                      type="text"
                      placeholder="Please enter the keywords"
                      className="pl-10 pr-4 py-2 border rounded-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  </div>
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus size={20} className="mr-2" /> Create App
                  </button>
                </div>
              </div>

              {/* App Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AppCard 
                  title="Excel analysis" 
                  description="Update your excel data and chat with it" 
                  icon={<Box className="text-green-500" size={40} />}
                  tags={['English', 'awel_layout', 'Unpublished']}
                  lastUpdate="15 hours ago"
                />
                <AppCard 
                  title="Database Knowledge" 
                  description="Understand database knowledge" 
                  icon={<Database className="text-orange-500" size={40} />}
                  tags={['English', 'single_agent', 'Unpublished']}
                  lastUpdate="a day ago"
                />
                <AppCard 
                  title="Weather Assistant" 
                  description="Your personal weather assistant" 
                  icon={<Sun className="text-blue-500" size={40} />}
                  tags={['English', 'awel_layout', 'Unpublished']}
                  lastUpdate="a day ago"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create App Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create App</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Work Modal</label>
              <div className="grid grid-cols-2 gap-4">
                <ModalOption 
                  title="Multi-agent automatic planning" 
                  description="Multiple Agents can be selected"
                  icon={<Box className="text-blue-500" size={40} />}
                />
                <ModalOption 
                  title="AWEL Flow App" 
                  description="Choose an AWEL workflow"
                  icon={<Database className="text-blue-500" size={40} />}
                />
                <ModalOption 
                  title="Single Agent" 
                  description="Only one Agent can be selected"
                  icon={<Users className="text-blue-500" size={40} />}
                />
                <ModalOption 
                  title="Native application" 
                  description="Choose a native app template"
                  icon={<Box className="text-blue-500" size={40} />}
                  selected
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">App Name</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="Chat Data App" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea className="w-full p-2 border rounded" rows={3} defaultValue="Chat with Data use RAG and text2SQL" />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-200 rounded mr-2">Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatInterface: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white p-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          <img src="/api/placeholder/32/32" alt="Chat Excel" className="w-8 h-8 mr-2" />
          <span className="font-bold">Chat Excel</span>
          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">native_app</span>
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">chat_excel</span>
        </div>
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-full"><ThumbsUp size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><ThumbsDown size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><Volume2 size={20} /></button>
          <button className="ml-2 p-1 hover:bg-gray-100 rounded-full"><img src="/api/placeholder/24/24" alt="Options" className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start">
          <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full mr-3" />
          <div className="bg-blue-100 p-3 rounded-lg max-w-3xl">
            <p>Analyze the popularity of products in different markets through sales data from different countries</p>
          </div>
        </div>
        <div className="flex items-start">
          <img src="/api/placeholder/40/40" alt="Assistant" className="w-10 h-10 rounded-full mr-3" />
          <div className="bg-white p-3 rounded-lg max-w-3xl shadow">
            <p>This problem can be analyzed by using the country and product information in the sales data to understand the popularity of products in different markets. We can analyze it in the following ways:</p>
            {/* Add chart and other content here */}
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 border-t">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <input type="text" placeholder="Ask me anything, Shift + Enter newline" className="flex-1 bg-transparent outline-none" />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-full"><Send size={20} /></button>
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false, onClick }) => (
  <div 
    className={`flex items-center p-2 mb-2 rounded cursor-pointer ${active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

const NavButton: React.FC<NavButtonProps> = ({ icon, text, active = false }) => (
  <button className={`flex items-center ${active ? 'text-blue-500' : 'text-gray-600'}`}>
    {icon}
    <span className="ml-1">{text}</span>
  </button>
);

const AppCard: React.FC<AppCardProps> = ({ title, description, icon, tags, lastUpdate }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-start mb-2">
      {icon}
      <div className="ml-4">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map((tag, index) => (
        <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded">{tag}</span>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-500">
      <span>001</span>
      <span>{lastUpdate} Update</span>
      <button className="text-blue-500">Chat</button>
    </div>
  </div>
);

const ModalOption: React.FC<ModalOptionProps> = ({ title, description, icon, selected = false }) => (
  <div className={`border p-4 rounded ${selected ? 'border-blue-500' : ''}`}>
    <div className="flex items-center mb-2">
      {icon}
      <h3 className="ml-2 font-bold">{title}</h3>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default DBGPTAppInterface;