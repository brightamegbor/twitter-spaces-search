// export default async function DateFormatter(dateTime) {
//     var now = Date.now();
//     var justNow = new Date(Date.now() - 1000 * 60);
//     var localDate = dateTime.toLocaleDateString();

//     if (!localDate.difference(justNow).isNegative) {
//         return localizedValues.justNow;
//     }

//     var roughTimeString = Intl.DateTimeFormat('jm').format(dateTime);
//     if (localDate.day == now.day && localDate.month == now.month && localDate.year == now.year) {
//         return roughTimeString;
//     }

//     var yesterday = now.subtract(Duration(days: 1));
//     if (localDate.day == yesterday.day && localDate.month == yesterday.month && localDate.year == yesterday.year) {
//         return localizedValues.yesterday + ' ' + roughTimeString;
//     }

//     if (now.difference(localDate).inDays < 4) {
//       var weekday = Intl.DateTimeFormat('EEEE').format(localDate);
//         return '$weekday, $roughTimeString';
//     }

//     return `${Intl.DateTimeFormat('dd MMM yyyy').format(dateTime)}, $roughTimeString`;

// }