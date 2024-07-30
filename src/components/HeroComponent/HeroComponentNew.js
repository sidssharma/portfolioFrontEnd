import LeftHeroComponent from "./LeftHeroComponent";
import RightHeroComponent from "./RightHeroComponent";
import "./HeroComponentNew.css"; // Make sure to import the CSS file

export default function HeroComponentNew(props) {
    return (
        <div className="heroComponentRow">
            <div className="heroComponentFirstRow">
                <LeftHeroComponent />
            </div>
            <div className="heroComponentSecondRow">
                <RightHeroComponent />
            </div>
        </div>
    );
}
