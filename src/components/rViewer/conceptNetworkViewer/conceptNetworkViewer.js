import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PGridViewer from './presentation/pGridViewer';
import DGridViewer from './definition/dGridViewer';
import './conceptNetworkViewer.css';

const presentation = "presentation";
const definition = "definition";
const calculation = "calculation";

function ConceptNetworkViewer({idFromQuery, renderablesHash}) {
    const [tabs, setTabs] = React.useState(definition);
    const [currentHash, setCurrentHash] = React.useState('');
    const [renderablesData, setRenderablesData] = React.useState(null);

    const presentationClass = (tabs===presentation)?"tab-selected":"";
    const definitionClass = (tabs===definition)?"tab-selected":"";
    const calculationClass = (tabs===calculation)?"tab-selected":"";

    useEffect(() => {
        if (!idFromQuery || !renderablesHash || (renderablesHash === currentHash)){
            return;
        }
        setCurrentHash(renderablesHash);
        fetch('/folders/' + idFromQuery + '/' + renderablesHash)
            .then(response => response.json())
            .then(data => {setRenderablesData(data)});
        return
    },[idFromQuery, renderablesHash, currentHash]);

    return (
        <>
        <div className="tab">
            <button className={presentationClass} onClick={_=>setTabs(presentation)}>Presentation</button>
            <button className={definitionClass} onClick={_=>setTabs(definition)}>Definition</button>
            <button className={calculationClass} onClick={_=>setTabs(calculation)}>Calculation</button>
        </div>

        {(renderablesHash !== currentHash) && <div className="loader" title="loader"></div>}

        {tabs===presentation && <PGridViewer renderablesData={renderablesData} />}
        {tabs===definition && <DGridViewer renderablesData={renderablesData} renderablesHash={renderablesHash} />}
        </>
    )
}

ConceptNetworkViewer.propTypes = {
    idFromQuery: PropTypes.string,
    renderablesHash: PropTypes.string
};

export default ConceptNetworkViewer;