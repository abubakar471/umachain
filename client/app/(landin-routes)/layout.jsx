import Navbar from "@/components/layout/Navbar"

const LandingLayout = ({ children }) => {
    return (
        <div className='px-10!'>
            <Navbar />
            {children}
        </div>
    )
}

export default LandingLayout