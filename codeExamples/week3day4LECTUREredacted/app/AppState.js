import { FieldReport } from './models/FieldReport.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Example.js').Example[]} */
  examples = []

  // NOTE typing your properties in the appstate will give you good intellisense elsewhere in your code
  /**
   * @type {FieldReport[]}
   */
  fieldReports = [
    // new FieldReport({
    //   title: 'Bigfoot',
    //   threatLevel: '#ff0022',
    //   author: 'Jeremy',
    //   securityLevel: 'Midnight'
    // }),
    // new FieldReport({
    //   title: 'Dolphins',
    //   threatLevel: '#008eff',
    //   author: 'Mick',
    //   securityLevel: 'High Noon'
    // }),
  ]

  /**
   * @type {FieldReport}
   */
  activeFieldReport = null
}

export const AppState = createObservableProxy(new ObservableAppState())