/**
 * a function that will format and return the formatted date
 * @param date the date will be formatted, default is current date
 * @param locale locales options, default is id-ID
 * @returns
 */

const formatDate = (date: string, locale = 'id-ID') => {
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long'
  })

  return formatter.format(new Date(date))
}

export default formatDate
