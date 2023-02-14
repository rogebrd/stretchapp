import './App.css';
import './styles/app.scss';
import { StretchApp } from './components/app';
import { MetaTags } from 'react-meta-tags';
import ReactGA from 'react-ga';
const TRACKING_ID = "G-177Y7P59J3";
ReactGA.initialize(TRACKING_ID);

export default function App() {

  return (
    <div className="App">
      <MetaTags>
        <title>stretchy.ninja</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4112999267280161" crossOrigin="anonymous"></script>
      </MetaTags>
      <StretchApp />
    </div>
  );
}
