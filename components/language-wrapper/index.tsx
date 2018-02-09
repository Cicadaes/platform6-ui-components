import * as React from 'react'
import * as ReactDOM from 'react-dom'

//const
import { languageIso, Language } from './constants/Data'

//helpers
import { addValToArrayNoDup, removeValFromArrayNoDup, loadTooltips, unloadTooltips, compileWordings } from '@amalto/helpers'

//wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

//components
import TypeaheadInput from '@amalto/typeahead-input'

//modules
import * as classNames from 'classnames'

module LanguageWrapper {
    export interface Props extends React.Props<LanguageWrapper> {
        /** Current selected language. */
        selectedLanguage: string;
        /** Array of language selected. */
        supportedLanguages: string[];
        /** Select language event. */
        handleLanguageChange: ( language: string ) => void;
        /** Add language event. */
        handleAddedLanguage: ( language: string ) => void;
        /** Remove language event. */
        handleRemovedLanguage: ( language: string ) => void;
        /** CSS Class of the div root component. */
        containerClass?: string;
        /** Language selected. */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<LanguageWrapper>;
    }

    export interface State {
        addOpen?: boolean;
        wordings?: { [id: string]: string };
    }
}

class LanguageWrapper extends React.Component<LanguageWrapper.Props, LanguageWrapper.State> {

    constructor( props: LanguageWrapper.Props ) {
        super( props )
        this.state = {
            addOpen: false,
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    componentDidMount() {
        loadTooltips( ReactDOM.findDOMNode( this ) )
    }

    componentDidUpdate() {
        loadTooltips( ReactDOM.findDOMNode( this ) )
    }

    componentWillUnmount() {
        unloadTooltips( ReactDOM.findDOMNode( this ) )
    }

    render() {

        const { addOpen, wordings } = this.state
        const { selectedLanguage, handleLanguageChange, handleRemovedLanguage, containerClass } = this.props

        return (
            <div className={containerClass}>
                <div className="form-inline">

                    <label>{wordings['languagewrapper.selected']}</label>

                    <select className="form-control mgl-10"
                        value={selectedLanguage}
                        onChange={e => handleLanguageChange( e.target.value )}>
                        {
                            this.props.supportedLanguages.map( ( lang, idx ) => (
                                <option key={idx} value={lang}>{lang}</option>
                            ) )
                        }
                    </select>

                    {this.getLanguagesSelector()}

                    {
                        addOpen ? <button className='btn btn-sm btn-trans btn-font mgl-10'
                            type='button'
                            onClick={() => { this.setState( { addOpen: false } ) }}
                            data-toggle='tooltip' data-original-title={wordings['languagewrapper.close.selector']}>
                            <span className="fa fa-times" />
                        </button> : null
                    }

                    {
                        selectedLanguage ? (
                            <button type='button'
                                className="btn btn-sm btn-trans btn-danger mgl-10"
                                onClick={( e ) => { e.preventDefault(); handleRemovedLanguage( selectedLanguage ) }}
                                data-toggle="tooltip" data-original-title={wordings['languagewrapper.remove.selected']}>
                                <span className="fa fa-minus" />
                            </button>
                        ) : null
                    }


                </div>

            </div>
        )
    }

    private getLanguagesSelector = () => {

        const { addOpen, wordings } = this.state

        return addOpen ? (
            <span className="mgl-10 inline-middle">
                <TypeaheadInput id="languageWrapperSelector"
                    handleInputChange={this.handleLanguageSelection}
                    value={this.getSelectedLanguage()}
                    collection={languageIso}
                    display={( lang: Language ) => lang && lang.languageCode && `${ lang.languageCode } - ${ lang.languageName }`}
                    datumTokenizer={( lang: Language ) => [lang.languageCode, lang.languageName]}
                    placeholder={wordings['languagewrapper.search']}
                />
            </span>
        ) : (
                <button className="btn btn-sm btn-trans btn-info mgl-10"
                    type="button"
                    onClick={() => { this.setState( { addOpen: true } ) }}
                    data-toggle="tooltip" data-original-title={wordings['languagewrapper.add.one']}>
                    <span className="fa fa-plus" />
                </button>
            )
    }

    private handleLanguageSelection = ( lang: Language ) => {
        const { supportedLanguages, handleAddedLanguage } = this.props
        const selectedLanguage = languageIso.filter( language => lang && language.languageCode === lang.languageCode )

        if ( selectedLanguage.length === 1 ) {
            handleAddedLanguage( lang.languageCode )
            this.setState( {
                addOpen: false
            } )
        }
    }

    private getSelectedLanguage = () => {
        const selectedLanguage = languageIso.filter( lang => lang.languageCode === this.props.selectedLanguage )
        return selectedLanguage.length === 1 ? selectedLanguage[0] : undefined
    }

}

export default LanguageWrapper