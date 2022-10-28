import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import MedicalFacility from './Sections/MedicalFacility';
import Specialty from './Sections/Specialty';
import OutstandingDoctor from './Sections/OutstandingDoctor';
import HandBook from './Sections/HandBook';
import About from './Sections/About';
import HomeFooter from './Sections/HomeFooter';
import './HomePage.scss'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
    // handeAfterChange = (index, dontAnimate) => {

    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoto: this.handeAfterChange()
            // autoplay: true,
            // speed: 5000,
            // autoplaySpeed: 2000,
            // cssEase: "linear"
        };
        return (
            <div>
                <HomeHeader
                    isShowBanner={true}
                    inHomePage={true}
                />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
