export {rxComponentElement, AccessorPromiseString, OverrideWebdriver, Promise} from './src/rxComponent';
export {rxActionMenu, rxAction} from './src/rxActionMenu.page';
// export {rxAge} from './src/rxAge.page';
export {rxBulkSelect, rxBulkSelectRow} from './src/rxBulkSelect.page';
export {rxCheckbox, rxCheckboxAccessor} from './src/rxCheckbox.page';
// export {rxCharacterCount} from './src/rxCharacterCount.page';
// export {rxCollapse} from './src/rxCollapse.page';
// export {rxCopy} from './src/rxCopy.page';
export {rxDatePicker} from './src/rxDatePicker.page';
// export {rxDiskSize} from './src/rxDiskSize.page';
export {rxFeedback} from './src/rxFeedback.page';
export {rxFieldName} from './src/rxFieldName.page';
// export {rxLocalStorage} from './src/rxLocalStorage.page';
// export {rxMetadata} from './src/rxMetadata.page';
// export {rxMisc} from './src/rxMisc.page';
export {rxModalAction} from './src/rxModalAction.page';
// export {rxMultiSelect} from './src/rxMultiSelect.page';
export {rxNotify, rxNotification} from './src/rxNotify.page';
// export {rxPaginate} from './src/rxPaginate.page';
export {rxRadio, rxRadioAccessor} from './src/rxRadio.page';
// export {rxSearchBox} from './src/rxSearchBox.page';
export {rxSelect, rxSelectAccessor} from './src/rxSelect.page';
// export {rxSelectFilter} from './src/rxSelectFilter.page';
// export {rxSortableColumn, SORT_TYPE} from './src/rxSortableColumn.page';
// export {rxStatusColumn, STATUS_COLORS, STATUS_ICONS} from './src/rxStatusColumn.page';
// export {rxTags, Tag} from './src/rxTags.page';
export {parseUtcOffset, rxTimePicker} from './src/rxTimePicker.page';
// export {rxToggleSwitch} from './src/rxToggleSwitch.page';
// export {Tabs, Tab} from './src/tabs.page';
// export {Tooltip} from './src/tooltip.page';
// export {Typeahead} from './src/typeahead.page';

import {rxBulkSelect as rxBulkSelectExercise} from './src/rxBulkSelect.exercise';
import {rxCheckbox as rxCheckboxExercise} from './src/rxCheckbox.exercise';
// import {rxCharacterCount as rxCharacterCountExercise} from './src/rxCharacterCount.exercise';
// import {rxCollapse as rxCollapseExercise} from './src/rxCollapse.exercise';
// import {rxCopy as rxCopyExercise} from './src/rxCopy.exercise';
import {rxDatePicker as rxDatePickerExercise} from './src/rxDatePicker.exercise';
import {rxFieldName as rxFieldNameExercise} from './src/rxFieldName.exercise';
// import {rxMetadata as rxMetadataExercise} from './src/rxMetadata.exercise';
// import {rxMultiSelect as rxMultiSelectExercise} from './src/rxMultiSelect.exercise';
// import {rxPaginate as rxPaginateExercise} from './src/rxPaginate.exercise';
import {rxRadio as rxRadioExercise} from './src/rxRadio.exercise';
// import {rxSearchBox as rxSearchBoxExercise} from './src/rxSearchBox.exercise';
import {rxSelect as rxSelectExercise} from './src/rxSelect.exercise';
// import {rxTags as rxTagsExercise} from './src/rxTags.exercise';
export {textFieldAccessor} from './src/textField.page';
// import {rxToggleSwitch as rxToggleSwitchExercise} from './src/rxToggleSwitch.exercise';

export const exercise: {
    rxBulkSelect: typeof rxBulkSelectExercise
    rxCheckbox: typeof rxCheckboxExercise
    // rxCharacterCount: typeof rxCharacterCountExercise
    // rxCollapse: typeof rxCollapseExercise
    // rxCopy: typeof rxCopyExercise
    rxDatePicker: typeof rxDatePickerExercise
    rxFieldName: typeof rxFieldNameExercise
    // rxMetadata: typeof rxMetadataExercise
    // rxMultiSelect: typeof rxMultiSelectExercise
    // rxPaginate: typeof rxPaginateExercise
    rxRadio: typeof rxRadioExercise
    // rxSearchBox: typeof rxSearchBoxExercise
    rxSelect: typeof rxSelectExercise
    // rxTags: typeof rxTagsExercise
    // rxToggleSwitch: typeof rxToggleSwitchExercise
}