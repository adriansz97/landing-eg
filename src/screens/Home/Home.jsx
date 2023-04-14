import { useContext, useRef } from "react";
import { AppContext, ThemeContext } from "../../context/AppContext";
import { Navbar } from "../../components/Golbal/navbar/Navbar";
import { Header } from "../../components/Golbal/Header/Header";
import { Footer } from "../../components/Golbal/Footer/Footer";
import { Hero } from "./Hero/Hero";
import { ContactCarousel } from "./ContactCarousel/ContactCarousel";
import { HowWorks } from "./HowWorks/HowWorks";
import { BeAgent } from "./BeAgent/BeAgent";
// import Announcement from "./Announcement/Announcement";
import { FollowUp } from "./FollowUp/FollowUp";
import { Download } from "./Download/Download";
import { FrequentQuestions } from "./FrequentQuestions/FrequentQuestions";

export const Home = () =>{
    
    const { clientName } = useContext(AppContext);
    const { primaryColor, secondaryColor } = useContext(ThemeContext);
    const beAgentRef = useRef(null);
    const followUpRef = useRef(null);
    const downloadRef = useRef(null);

    const scrollToRef = (scrollName) => {
        let topPosition = 0;
        if (scrollName==="BeAgent") {
            topPosition = beAgentRef.current.offsetTop - 16;
        } else if (scrollName==="FollowUp") { 
            topPosition = followUpRef.current.offsetTop - 16;
        } else if (scrollName==="Download") { 
            topPosition = downloadRef.current.offsetTop;
        }
        window.scrollTo({
            top: topPosition,
            behavior: "smooth"
        });
    }

    return (
        <div className="home-page">

            <Navbar />

            <Header />

            <Hero 
                clientName={clientName} 
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                scrollToRef={scrollToRef} 
            />

            <ContactCarousel 
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                scrollToRef={scrollToRef}
            />

            <HowWorks />

            <FrequentQuestions />

            <BeAgent 
                clientName={clientName} 
                beAgentRef={beAgentRef} 
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
            /> {/* Form */}

            <FollowUp
                clientName={clientName} 
                followUpRef={followUpRef} 
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
            /> {/* <Announcement /> */}

            <Download 
                clientName={clientName}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                downloadRef={downloadRef}
            />

            <Footer 
                scrollToRef={scrollToRef}
            />

        </div>
    );
}