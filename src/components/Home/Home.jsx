import Navbar from "../Golbal/navbar/Navbar";
import Header from "../Golbal/Header/Header";
import Hero from "./Hero/Hero";
import ContactCarousel from "./ContactCarousel/ContactCarousel";
import HowWorks from "./HowWorks/HowWorks";
import BeAgent from "./BeAgent/BeAgent";
import Announcement from "./Announcement/Announcement";
import FollowUp from "./FollowUp/FollowUp";
import Download from "./Download/Download";
import FrequentQuestions from "./FrequentQuestions/FrequentQuestions";
import Footer from "../Golbal/Footer/Footer";

const Home = () =>{
    return (
        <>
            <Navbar />
            <Header />
            <Hero />
            <ContactCarousel />
            <HowWorks />
            <BeAgent /> {/* formulario */}
            <Announcement />
            <FollowUp />
            <Download />
            <FrequentQuestions />
            <Footer />
        </>
    );
}

export default Home;