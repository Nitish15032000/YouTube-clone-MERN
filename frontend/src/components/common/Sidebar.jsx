import { 
   FiHome, 
   FiCompass, 
   FiYoutube,
   FiClock,
   FiThumbsUp,
   FiSettings
 } from 'react-icons/fi';
 import { useNavigate } from 'react-router-dom';
 
 /**
  * Sidebar component with navigation links
  */
 const Sidebar = ({ isOpen, closeSidebar }) => {
   const navigate = useNavigate();
   
   // Sidebar items with icons and navigation paths
   const sidebarItems = [
     { icon: <FiHome />, text: 'Home', path: '/' },
     { icon: <FiCompass />, text: 'Explore', path: '/search' },
     { icon: <FiYoutube />, text: 'Subscriptions', path: '/subscriptions' },
     { icon: <FiClock />, text: 'History', path: '/history' },
     { icon: <FiThumbsUp />, text: 'Liked videos', path: '/liked-videos' },
     { icon: <FiSettings />, text: 'Settings', path: '/settings' },
   ];
 
   return (
     <>
       {/* Mobile overlay */}
       {isOpen && (
         <div 
           className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
           onClick={closeSidebar}
         />
       )}
       
       {/* Sidebar */}
       <aside className={`
         fixed md:static z-30 h-full w-64 bg-dark-800 transform transition-transform duration-300
         ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
       `}>
         <div className="p-4 overflow-y-auto h-full">
           {sidebarItems.map((item, index) => (
             <div 
               key={index}
               className="flex items-center p-3 rounded-lg hover:bg-dark-700 cursor-pointer mb-1"
               onClick={() => {
                 navigate(item.path);
                 closeSidebar();
               }}
             >
               <span className="text-xl mr-4">{item.icon}</span>
               <span>{item.text}</span>
             </div>
           ))}
         </div>
       </aside>
     </>
   );
 };
 
 export default Sidebar;