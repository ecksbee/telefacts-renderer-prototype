import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const selectizeStyles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: '16px',
    }),
    control: base => ({
        ...base,
        fontSize: '16px',
    }),
    menu: base => ({
        ...base,
        fontSize: '16px',
    })
};

function Selectize(props) {

    return (
            <Select className="selectize" styles={selectizeStyles} options={props.options} onChange={props.onChange} />  
    );
}

Selectize.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
      })).isRequired,

    selected: PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
    }),

    onChange: PropTypes.func.isRequired
};

export default Selectize;
