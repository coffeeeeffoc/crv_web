import DATE from './dateType'
import CURRENCY from './currencyType'
import TEXT from './textType'
import INTEGER from './integerType'
import LONG_TEXT from './lengthTextType'
import DECIMAL from './decimalType'
import TIME from './timeType'
import DATE_TIME from './dateTimeType'
import YEAR from './yearType'
import MONTH from './monthType'
import ENUM from './enumType'
import YEAR_MONTH from './yearMonthType'
import PERCENTAGE from './percentageType'
import PERMILLAGE from './permillageType'

export const createFieldType = { PERCENTAGE, PERMILLAGE, YEAR_MONTH, ENUM, DATE, CURRENCY, TEXT, INTEGER, LONG_TEXT, DECIMAL, TIME, DATE_TIME, YEAR, MONTH }

export default createFieldType
