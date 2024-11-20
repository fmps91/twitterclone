import { useEffect, useState } from "react";


const Theme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "black" ? localStorage.getItem("theme") : "ligth"
  );

  /* const [colorIcon, setcolorIcon] = useState(
    localStorage.getItem("theme") === "black" ? localStorage.getItem("theme") : "ligth"
  );

  const [colorIcon, setcolorIcon] = useState(
    localStorage.getItem("theme") === "black" ? localStorage.getItem("theme") : "ligth"
  ); */


  const handleToggle = (e) => {
    
    if (localStorage.getItem("theme")==="ligth") {
        setTheme("black");
        //colorIcon:white
        //hover:bg-stone-900
    }
    else{
        setTheme("ligth");
        //hover:#4a4c4e
        //colorIcon:black
       
    }
    
    
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      <div
        className="flex"
        
      >
        
        <div className="w-1/6 md:w-full"
        
        >
        <label className="flex cursor-pointer gap-2" onClick={handleToggle}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </label>
        </div>
        
        
      </div>
      
    </>
  );
};

export default Theme ;
