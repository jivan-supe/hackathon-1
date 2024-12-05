import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDownIcon, HomeIcon, UserIcon, DocumentIcon, Bars3Icon } from '@heroicons/react/24/outline';
import './Sidebar.scss';

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    title: 'User Management',
    icon: <UserIcon className="w-6 h-6" />,
    submenu: [
      { title: 'Users', path: '/users', icon: <UserIcon className="w-5 h-5" /> },
      { title: 'Roles', path: '/roles', icon: <DocumentIcon className="w-5 h-5" /> },
    ],
  },
];

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedItems.includes(item.title);

    if (item.submenu) {
      return (
        <div key={item.title} className="sidebar-item">
          <button
            className="sidebar-button"
            onClick={() => toggleSubmenu(item.title)}
          >
            {item.icon}
            <span>{item.title}</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
          {isExpanded && (
            <div className="submenu">
              {item.submenu.map(subItem => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path!}
                  className="submenu-item"
                  onClick={closeSidebar}
                >
                  {subItem.icon}
                  <span>{subItem.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.path}
        to={item.path!}
        className="sidebar-item"
        onClick={closeSidebar}
      >
        {item.icon}
        <span>{item.title}</span>
      </NavLink>
    );
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        <Bars3Icon className="w-6 h-6" />
      </button>
      
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={closeSidebar} />
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>App Name</h1>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;