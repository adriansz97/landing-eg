import { useContext, useRef } from "react";
import { AppContext, ThemeContext } from "../../context/AppContext";
import Navbar from "../Golbal/navbar/Navbar";
import Header from "../Golbal/Header/Header";
import Hero from "./Hero/Hero";
import ContactCarousel from "./ContactCarousel/ContactCarousel";
import HowWorks from "./HowWorks/HowWorks";
import BeAgent from "./BeAgent/BeAgent";
// import Announcement from "./Announcement/Announcement";
import FollowUp from "./FollowUp/FollowUp";
import Download from "./Download/Download";
import FrequentQuestions from "./FrequentQuestions/FrequentQuestions";
import Footer from "../Golbal/Footer/Footer";

const Home = () =>{
    
    const { clientName } = useContext(AppContext);
    const { primaryColor, secondaryColor } = useContext(ThemeContext);
    const howItWorksRef = useRef(null);
    const followUpRef = useRef(null);

    const scrollToRef = (scrollName) => {
        let topPosition = 16;
        if (scrollName==="HowItWorks") {
            topPosition = howItWorksRef.current.offsetTop;
        } else if (scrollName==="FollowUp") { 
            topPosition = followUpRef.current.offsetTop;
        }
        window.scrollTo({
            top: topPosition - 16,
            behavior: "smooth"
        });
    }

    return (
        <>

            <Navbar />

            <Header />

            <Hero 
                clientName={clientName} 
                scrollToRef={scrollToRef} 
            />

            <ContactCarousel />

            <HowWorks />

            <BeAgent 
                clientName={clientName} 
                howItWorksRef={howItWorksRef} 
            /> {/* Form */}

            <FollowUp
                clientName={clientName} 
                followUpRef={followUpRef} 
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
            /> {/* <Announcement /> */}

            <Download 
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
            />

            <FrequentQuestions />

            <Footer />

        </>
    );
}

export default Home;