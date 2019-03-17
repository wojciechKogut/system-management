import React, {Component} from 'react';
import classnames from "classnames";

export const TextFieldGroup = function(props) {
    return (
        <div>
            <input
                className={classnames("form-control form-control-lg", {
                    "is-invalid": props.error
                })}
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

