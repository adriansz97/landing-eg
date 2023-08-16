import { useRef } from "react";
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
import { useSelector } from "react-redux";

export const Home = () =>{
    
    const { campaingName, domain, channels, content, colors, formType } = useSelector(st=>st.app);
    // const { primaryColor, secondaryColor, primaryColorText, secondaryColorText } = useSelector(st=>st.theme);
    const howWorksRef = useRef(null);
    const frequentQuestionsRef = useRef(null);
    const beAgentRef = useRef(null);
    const followUpRef = useRef(null);
    const downloadRef = useRef(null);

    const scrollToRef = (scrollName) => {
        let topPosition = 0;
        if (scrollName==="HowWorks") {
            topPosition = howWorksRef.current.offsetTop;
        } else if (scrollName==="FrequentQuestions") {
            topPosition = frequentQuestionsRef.current.offsetTop;
        } else if (scrollName==="BeAgent") {
            topPosition = beAgentRef.current.offsetTop;
        } else if (scrollName==="FollowUp") { 
            topPosition = followUpRef.current.offsetTop;
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
                campaingName={campaingName} 
                content={content}
                colors={colors}
                scrollToRef={scrollToRef} 
                formType={formType}
            />

            <ContactCarousel 
                content={content} 
                colors={colors}
                channels={channels}
                scrollToRef={scrollToRef}
                formType={formType}
            />

            <HowWorks 
                howWorksRef={howWorksRef}
            />

            <FrequentQuestions 
                campaingName={campaingName}
                frequentQuestionsRef={frequentQuestionsRef}
            />

            {/* {
                (formType === "home" || formType === "both") && */}
                <BeAgent 
                    campaingName={campaingName}
                    beAgentRef={beAgentRef}
                    content={content}
                />
            {/* } */}

            <FollowUp
                followUpRef={followUpRef} 
                colors={colors}
            />

            <Download 
                campaingName={campaingName}
                colors={colors}
                downloadRef={downloadRef}
            />

            <Footer 
                scrollToRef={scrollToRef}
            />

        </div>
    );
}