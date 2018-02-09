import * as React from 'react'
import * as ReactDOM from 'react-dom'

//modules
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//components
import Help from '@amalto/help'
import Typeahead from '@amalto/typeahead-input'

//utils
import * as classNames from 'classnames'

namespace TypeaheadFormInput {
    export interface Props extends BaseFieldProps {
        /** Input's name. */
        name: string;
        /** Collection of item to be display inside the dropdown list. */
        collection: any[];
        /** Search remotely from server. */
        remote?: Typeahead.RemoteConfig;
        /** Manage the dropdown list of choices when input value is updated by user. */
        datumTokenizer?: ( datum: any ) => string[];
        /** Manage input value to be displayed. */
        display?: ( value: any ) => string;
        /** Form input label. */
        label?: string | JSX.Element;
        /** Input's placeholder. */
        placeholder?: string;
        /** Tooltip help displayed when hovering the "?" icon next to label. */
        help?: string;
        /** CSS class names applied to the input <strong>div</strong> container. */
        containerClass?: string;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         */
        collapseErrorSpace?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<TypeaheadFormInput>;

        /** redux-form props */

        /** @ignore */
        component?: any,
        /** @ignore */
        format?: any,
        /** @ignore */
        normalize?: any,
        /** @ignore */
        props?: any,
        /** @ignore */
        parse?: any,
        /** @ignore */
        validate?: any,
        /** @ignore */
        warn?: any,
        /** @ignore */
        withRef?: any
    }

    export interface State {

    }
}

class TypeaheadFormInput extends React.Component<TypeaheadFormInput.Props, TypeaheadFormInput.State> {

    constructor( props: TypeaheadFormInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderInput = ( field: WrappedFieldProps<any> ) => {

        const { name, label, help, containerClass, collection, remote, collapseErrorSpace, display, datumTokenizer, placeholder } = this.props

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <Typeahead id={name}
                    collection={collection}
                    remote={remote}
                    display={display}
                    value={input.value}
                    handleInputChange={input.onChange as any}
                    datumTokenizer={datumTokenizer}
                    placeholder={placeholder}
                />

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            </div>
        )
    }

    render() {

        const { name, label, format, normalize, parse, validate, warn } = this.props

        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        return name ? (

            <Field {...baseFieldProps} component={this.renderInput} />

        ) : null

    }

}


export default TypeaheadFormInput