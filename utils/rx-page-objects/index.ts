'use strict';

export { rxComponentElement, AccessorPromiseString, OverrideWebdriver, Promise } from './src/rxComponent';
export { rxActionMenu, rxAction } from './src/rxActionMenu.page';
export { rxAge } from './src/rxAge.page';
export { rxBulkSelect, rxBulkSelectRow } from './src/rxBulkSelect.page';
export { rxCheckbox, rxCheckboxAccessor } from './src/rxCheckbox.page';
export { rxCharacterCount } from './src/rxCharacterCount.page';
export { rxCollapse } from './src/rxCollapse.page';
export { rxCopy } from './src/rxCopy.page';
export { rxDatePicker } from './src/rxDatePicker.page';
export { rxDiskSize } from './src/rxDiskSize.page';
export { rxFeedback } from './src/rxFeedback.page';
export { rxFieldName } from './src/rxFieldName.page';
export { rxLocalStorage } from './src/rxLocalStorage.page';
export { rxMetadata } from './src/rxMetadata.page';
export { rxMisc } from './src/rxMisc.page';
export { rxModalAction } from './src/rxModalAction.page';
export { rxMultiSelect } from './src/rxMultiSelect.page';
export { rxNotify, rxNotification } from './src/rxNotify.page';
export { rxPaginate } from './src/rxPaginate.page';
export { rxRadio, rxRadioAccessor } from './src/rxRadio.page';
export { rxSearchBox } from './src/rxSearchBox.page';
export { rxSelect, rxSelectAccessor } from './src/rxSelect.page';
export { rxSelectFilter } from './src/rxSelectFilter.page';
export { rxSortableColumn, SORT_TYPE } from './src/rxSortableColumn.page';
export { rxStatusCell, STATUS_COLORS, STATUS_ICONS } from './src/rxStatusCell.page';
export { rxTags, Tag } from './src/rxTags.page';
export { parseUtcOffset, rxTimePicker } from './src/rxTimePicker.page';
export { rxToggleSwitch } from './src/rxToggleSwitch.page';
export { Tabs, Tab } from './src/tabs.page';
export { textFieldAccessor } from './src/textField.page';
export { Tooltip } from './src/tooltip.page';
export { Typeahead } from './src/typeahead.page';

import { IRxBulkSelectExerciseOptions, rxBulkSelectExercise } from './src/rxBulkSelect.exercise';
import { IRxCheckboxExerciseOptions, rxCheckboxExercise } from './src/rxCheckbox.exercise';
import { IRxCharacterCountExerciseOptions, rxCharacterCountExercise } from './src/rxCharacterCount.exercise';
import { IRxCollapseExerciseOptions, rxCollapseExercise } from './src/rxCollapse.exercise';
import { IRxCopyExerciseOptions, rxCopyExercise } from './src/rxCopy.exercise';
import { IRxDatePickerExerciseOptions, rxDatePickerExercise } from './src/rxDatePicker.exercise';
import { IRxFieldNameExerciseOptions, rxFieldNameExercise } from './src/rxFieldName.exercise';
import { IRxMetadataExerciseOptions, rxMetadataExercise } from './src/rxMetadata.exercise';
import { IRxMultiSelectOptions, rxMultiSelectExercise } from './src/rxMultiSelect.exercise';
import { IRxPaginateExerciseOptions, rxPaginateExercise } from './src/rxPaginate.exercise';
import { IRxRadioExerciseOptions, rxRadioExercise } from './src/rxRadio.exercise';
import { IRxSearchBoxExerciseOptions, rxSearchBoxExercise } from './src/rxSearchBox.exercise';
import { IRxSelectExerciseOptions, rxSelectExercise } from './src/rxSelect.exercise';
import { IRxTagsExerciseOptions, rxTagsExercise } from './src/rxTags.exercise';
import { IRxToggleSwitchExerciseOptions, rxToggleSwitchExercise } from './src/rxToggleSwitch.exercise';

export const exercise = {
    rxBulkSelect: rxBulkSelectExercise,
    rxCheckbox: rxCheckboxExercise,
    rxCharacterCount: rxCharacterCountExercise,
    rxCollapse: rxCollapseExercise,
    rxCopy: rxCopyExercise,
    rxDatePicker: rxDatePickerExercise,
    rxFieldName: rxFieldNameExercise,
    rxMetadata: rxMetadataExercise,
    rxMultiSelect: rxMultiSelectExercise,
    rxPaginate: rxPaginateExercise,
    rxRadio: rxRadioExercise,
    rxSearchBox: rxSearchBoxExercise,
    rxSelect: rxSelectExercise,
    rxTags: rxTagsExercise,
    rxToggleSwitch: rxToggleSwitchExercise,
}