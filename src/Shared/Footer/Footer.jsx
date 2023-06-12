

const Footer = () => {
    return (
        <div>
            <footer className="footer pt-20 pb-10 md:px-40 bg-neutral text-gray-500">
                <div className="mx-auto text-center">
                    <img className="h-[100px] w-[100px] mx-auto md:mx-0" src="/navlogo.png" alt="" />
                    <p className="text-gray-400 text-left">SUMMER SPORTS<br />Providing reliable service since 1992</p>
                </div>
                <div className="mx-auto">
                    <span className="footer-title text-white">Services</span>
                    <a className="link link-hover text-center">Teaching</a>
                    <a className="link link-hover text-center">Coach</a>
                    <a className="link link-hover text-center">Marketing</a>
                    <a className="link link-hover text-center">Advertisement</a>
                </div>
                <div className="mx-auto">
                    <span className="footer-title text-white">Sports</span>
                    <a className="link link-hover text-center">BlackBall</a>
                    <a className="link link-hover text-center">BasketBall</a>
                    <a className="link link-hover text-center">Swimming</a>
                    <a className="link link-hover text-center">Press kit</a>
                </div>
                <div className="mx-auto">
                    <span className="footer-title text-white">Social</span>
                    <a className="link link-hover text-center">Facebook</a>
                    <a className="link link-hover text-center">Instagram</a>
                    <a className="link link-hover text-center">Youtube</a>
                    <a className="link link-hover text-center">Twitter</a>
                </div>
                <div className="mx-auto">
                    <span className="footer-title text-white">Contact</span>
                    <a className="link link-hover text-center">+880 0182125555</a>
                    <a className="link link-hover text-center">+880 0182125555</a>
                    <a className="link link-hover text-center">+880 0182125555</a>
                    <a className="link link-hover text-center">+880 0182125555</a>
                    
                </div>
            </footer>
            <footer className="footer footer-center p-4 bg-neutral text-gray-400">
                <div>
                    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;