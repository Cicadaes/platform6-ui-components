// Models
import { AppKey } from './AppKey'
import { RunningJob } from './JobControl'
import NotificationModel from './NotificationModel'
import { BatchOperationReport } from './BatchOperationReport'
import { WebApi } from './WebApi'

export interface DynamicComponent {

    /** Interface used to perform all the api call to the server. */
    api: WebApi;
    
    /** Allow you to handle your navigation. */
    appHistory: History;

    /** Actions controlling the DataGrid template such as sorting order or column width. */
    dataGridActions: any;
    
    /** Component to be display by an eval. */
    componentScript: string;
    
    /** Component data to be passed has props. */
    componentData?: any;
    
    /** Refresh data to be passed to component. */
    refreshData?: () => void;
    
    /** Context data saved into store to be restored on serveur. */
    contextData?: any;
    
    /**
     * Store component data inside the store as contextData.
     * @param { any } contextData
     */
    storeContext?: ( contextData: any ) => void;
    
    /**
     * Set dirty status of the component.
     * If true a comfirmation modal will shows up if you try to move to another menu.
     * @param { boolean } hasUnsavedChanges
     */
    setStatus?: ( hasUnsavedChanges: boolean ) => void;
    
    /** Component height. */
    height?: number;
    
    /** Component fullscreen status. */
    fullscreen?: boolean;
    
    /** Manage component fullscreen status. */
    setFullscreen?: ( fullscreen: boolean ) => void;
    
    /** Reload tooltip if not displayed correctly. */
    reloadTooltips?: () => void;
    
    /**
     * Show current job status.
     * @param { string | number } jobId
     * @param { ( job: RunningJob ) => void } callbackOnComplete
     */
    showJobStatus?: ( jobId: string | number, callbackOnComplete?: ( job: RunningJob ) => void ) => void;
    
    /** If any application publisher profile is accessible to user. */
    canSelectAppKey?: boolean;

    /** Current application publisher profile object selected. */
    selectedAppKey?: AppKey;
    
    /** Current application publisher profile name selected. */
    selectedAppKeyName?: string;
    
    /**
     * Application publisher profile is installed.
     * @param { string } appKeyName
     */
    hasAppKeyInstalled?: ( appKeyName: string ) => boolean;
    
    /**
     * Handle display of bach operations in case some of the operation fails and other succeed.
     * @param { BatchOperationReport } report
     */
    handleBatchOperationReportDisplay?: ( report: BatchOperationReport ) => void;

    /**
     * Display the custom confirmation modal.
     * @param { string } title
     * @param { React.ReactElement<any> | string } body
     * @param { any } [confirmAction]
     * @param { any } [cancelAction]
     * @param { string } [confirmLevel]
     * @param { string[] } [itemsList]
     */
    showDialog: ( title: string, body: React.ReactElement<any> | string, confirmAction?: any, cancelAction?: any, confirmLevel?: string, itemsList?: string[] ) => void;
    
    /** Hide the confirmation modal. */
    hideDialog: () => void;
    
    /**
     * Display a custom notification. More details on [NotificationModel](#notificationmodel).
     * @param { NotificationModel } notificationOptions
     */
    displayNotification: ( notificationOptions: NotificationModel ) => void;
    
    /**
     * Display an error notification for failed request.
     * @param { any } error
     */
    handleErrorDisplay: ( error: any ) => void;

    /**
     * Language to use on the component. e.g: "en-US".
     * Locales available at [Locale](#locale).
     */
    locale: string;

}

export default DynamicComponent