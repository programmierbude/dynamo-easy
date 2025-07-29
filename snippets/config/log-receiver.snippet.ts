import { LogInfo, updateDynamoEasyConfig } from '@progbu/dynamo-easy'

updateDynamoEasyConfig({
  logReceiver: (logInfo: LogInfo) => {
    const msg = `[${logInfo.level}] ${logInfo.timestamp} ${logInfo.className} (${
      logInfo.modelConstructor
      }): ${logInfo.message}`
    console.debug(msg, logInfo.data)
  }
})
