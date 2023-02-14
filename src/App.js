import './App.css';
import './styles/app.scss';
import { StretchApp } from './components/app';
import { MetaTags } from 'react-meta-tags';

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
