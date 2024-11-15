// show đánh index
// =>  show index from name_table;

// limit 100, 10 => 100 là số trang, 10 là số item cần lấy ra

// explain select * from users => explain kiểm tra có đánh index chưa nếu type = all thì chưa

// tạo đánh index ưa tiên những cột có trong mệnh đề where => create index idx_name_column ON name_table (name_column)

// chưa tối ưu
// SELECT SQL_NO_CACHE usr_id, usr_created_at_data, usr_email, usr_phone, usr_username, usr_created_at,
//     usr_create_ip_at, usr_last_login_at, usr_last_login_ip_at, usr_login_times, usr_status
// FROM pre_go_crm_user
// WHERE usr_created_at_data > '2024-07-23 00:00:00' AND usr_created_at_data < '2024-08-22 23:59:59'
// ORDER BY usr_created_at_data ASC, usr_id ASC
// LIMIT 9000000, 50;

// tối ưu
// SELECT SQL_NO_CACHE pre.usr_id, usr_created_at_data, usr_email, usr_phone, usr_username, usr_created_at,
//     usr_create_ip_at, usr_last_login_at, usr_last_login_ip_at, usr_login_times, usr_status
// FROM (
//     SELECT SQL_NO_CACHE usr_id
//     FROM pre_go_crm_user
//     WHERE usr_created_at_data > '2024-07-23 00:00:00' AND usr_created_at_data < '2024-08-22 23:59:59'
//     ORDER BY usr_created_at_data ASC, usr_id ASC
//     LIMIT 9000000, 50
// ) AS temp
// INNER JOIN `pre_go_crm_user` AS pre
// ON temp.usr_id = pre.usr_id
// ORDER BY usr_created_at_data ASC, usr_id ASC;

// check relation bị null
// public function name()
// {
//     return $this->belongsTo(User::class)->withDefault();
// }
