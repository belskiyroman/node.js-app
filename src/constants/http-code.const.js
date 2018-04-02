// 1xx: Informational информационные
module.exports.CONTINUE = 100;
module.exports.SWITCHING_PROTOCOLS = 101;
module.exports.PROCESSING = 102; // «идёт обработка»

// 2xx: Success успешно
module.exports.OK = 200; // «хорошо»
module.exports.PARTIAL_CONTENT = 206; // «частичное содержимое»
module.exports.MULTI_STATUS = 207; // «многостатусный»
module.exports.ALREADY_REPORTED = 208; // «уже сообщалось»
module.exports.IM_USED = 226; // «использовано IM»

// 3xx: Redirection перенаправление
module.exports.MULTIPLE_CHOICES = 300; // «множество выборов»
module.exports.MOVED_PERMANENTLY = 301; // «перемещено навсегда»
module.exports.MOVED_TEMPORARILY = 302; // «перемещено временно»
module.exports.FOUND = 302; // «найдено»
module.exports.SEE_OTHER = 303; // «смотреть другое»
module.exports.NOT_MODIFIED = 304; // «не изменялось»
module.exports.USE_PROXY = 305; // «использовать прокси»
// 306 — зарезервировано код использовался только в ранних спецификациях
module.exports.TEMPORARY_REDIRECT = 307; // «временное перенаправление»
module.exports.PERMANENT_REDIRECT = 308; // «постоянное перенаправление»

// 4xx: Client Error ошибка клиента
module.exports.BAD_REQUEST = 400; // = «плохой; неверный запрос»
module.exports.UNAUTHORIZED = 401; // «не авторизован не представился
module.exports.PAYMENT_REQUIRED = 402; // «необходима оплата»
module.exports.FORBIDDEN = 403; // «запрещено не уполномочен
module.exports.NOT_FOUND = 404; // «не найдено»
module.exports.METHOD_NOT_ALLOWED = 405; // «метод не поддерживается»
module.exports.NOT_ACCEPTABLE = 406; // «неприемлемо»
module.exports.PROXY_AUTHENTICATION_REQUIRED = 407; // «необходима аутентификация прокси»
module.exports.REQUEST_TIMEOUT = 408; // «истекло время ожидания»
module.exports.CONFLICT = 409; // «конфликт»
module.exports.GONE = 410; // «удалён»
module.exports.LENGTH_REQUIRED = 411; // «необходима длина»
module.exports.PRECONDITION_FAILED = 412; // «условие ложно»
module.exports.PAYLOAD_TOO_LARGE = 413; // «полезная нагрузка слишком велика»
module.exports.URI_TOO_LONG = 414; // «URI слишком длинный»
module.exports.UNSUPPORTED_MEDIA_TYPE = 415; // «неподдерживаемый тип данных»
module.exports.RANGE_NOT_SATISFIABLE = 416; // «диапазон не достижим»
module.exports.EXPECTATION_FAILED = 417; // «ожидание не удалось»
module.exports.I_AM_A_TEAPOT = 418; // «я — чайник»
module.exports.MISDIRECTED_REQUES = 421;
module.exports.UNPROCESSABLE_ENTITY = 422; // «необрабатываемый экземпляр»
module.exports.LOCKED = 423; // «заблокировано»
module.exports.FAILED_DEPENDENCY = 424; // «невыполненная зависимость»
module.exports.UPGRADE_REQUIRED = 426; // «необходимо обновление»
module.exports.PRECONDITION_REQUIRED = 428; // «необходимо предусловие»
module.exports.TOO_MANY_REQUESTS = 429; // «слишком много запросов»
module.exports.REQUEST_HEADER_FIELDS_TOO_LARGE = 431; // «поля заголовка запроса слишком большие»
module.exports.RETRY_WITH = 449; // «повторить с»
module.exports.UNAVAILABLE_FOR_LEGAL_REASONS = 451; // «недоступно по юридическим причинам»

// 5xx: Server Error ошибка сервера
module.exports.INTERNAL_SERVER_ERROR = 500; // «внутренняя ошибка сервера»
module.exports.NOT_IMPLEMENTED = 501; // «не реализовано»
module.exports.BAD_GATEWAY = 502; // = «плохой; ошибочный шлюз»
module.exports.SERVICE_UNAVAILABLE = 503; // «сервис недоступен»
module.exports.GATEWAY_TIMEOUT = 504; // «шлюз не отвечает»
module.exports.HTTP_VERSION_NOT_SUPPORTED = 505; // «версия HTTP не поддерживается»
module.exports.VARIANT_ALSO_NEGOTIATES = 506; // «вариант тоже проводит согласование»
module.exports.INSUFFICIENT_STORAGE = 507; // «переполнение хранилища»
module.exports.LOOP_DETECTED = 508; // «обнаружено бесконечное перенаправление»
module.exports.BANDWIDTH_LIMIT_EXCEEDED = 509; // «исчерпана пропускная ширина канала»
module.exports.NOT_EXTENDED = 510; // «не расширено»
module.exports.NETWORK_AUTHENTICATION_REQUIRED = 511; // «требуется сетевая аутентификация»
module.exports.UNKNOWN_ERROR = 520; // «неизвестная ошибка»
module.exports.WEB_SERVER_IS_DOWN = 521; // «веб-сервер не работает»
module.exports.CONNECTION_TIMED_OUT = 522; // «соединение не отвечает»
module.exports.ORIGIN_IS_UNREACHABLE = 523; // «источник недоступен»
module.exports.A_TIMEOUT_OCCURRED = 524; // «время ожидания истекло»
module.exports.SSL_HANDSHAKE_FAILED = 525; // «квитирование SSL не удалось»
module.exports.INVALID_SSL_CERTIFICATE = 526; // «недействительный сертификат SSL»
