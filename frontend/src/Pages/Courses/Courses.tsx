import CourseHero from "../../components/Courses/CourseHero";
import MentorSection from "../../components/Courses/MentorSection";
import CourseList from "../../components/Courses/CourseList";
import ContactSection from "../../components/Courses/ContactSection";

const Courses = () => {
      return (
            <div className="bg-black">
                  <CourseHero />
                  <MentorSection />
                  <CourseList />
                  <ContactSection />
            </div>
      )
}

export default Courses;