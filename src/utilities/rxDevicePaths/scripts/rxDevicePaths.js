angular.module('encore.ui.utilities')
/**
 * @ngdoc parameters
 * @name utilities.value:rxDevicePaths
 * @description
 * Provides configuration for device paths.
 *
 */
.value('rxDevicePaths', [
    { value: '/dev/xvdb', label: '/dev/xvdb' },
    { value: '/dev/xvdd', label: '/dev/xvdd' },
    { value: '/dev/xvde', label: '/dev/xvde' },
    { value: '/dev/xvdf', label: '/dev/xvdf' },
    { value: '/dev/xvdg', label: '/dev/xvdg' },
    { value: '/dev/xvdh', label: '/dev/xvdh' },
    { value: '/dev/xvdj', label: '/dev/xvdj' },
    { value: '/dev/xvdk', label: '/dev/xvdk' },
    { value: '/dev/xvdl', label: '/dev/xvdl' },
    { value: '/dev/xvdm', label: '/dev/xvdm' },
    { value: '/dev/xvdn', label: '/dev/xvdn' },
    { value: '/dev/xvdo', label: '/dev/xvdo' },
    { value: '/dev/xvdp', label: '/dev/xvdp' }
])

/**
 * @deprecated
 * Please use rxDevicePaths instead. This will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.value:devicePaths
 * @requires utilities.value:rxDevicePaths
 */
.service('devicePaths', function (rxDevicePaths) {
    console.warn(
        'DEPRECATED: devicePaths - Please use rxDevicePaths. ' +
        'devicePaths will be removed in EncoreUI 4.0.0'
    );
    return rxDevicePaths;
});
