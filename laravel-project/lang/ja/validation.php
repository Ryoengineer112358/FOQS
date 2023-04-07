<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => ':attributeを承認してください。',
    'accepted_if' => ':otherが:valueの時、:attributeを承認してください。',
    'active_url' => ':attributeは、有効なURLではありません。',
    'after' => ':attributeは、:date以降の日付にしてください。',
    'after_or_equal' => ':attributeは、:date以降の日付にしてください。',
    'alpha' => ':attributeは、アルファベットのみで入力してください。',
    'alpha_dash' => ':attributeは、アルファベット、数字、ダッシュ、アンダースコアのみで入力してください。',
    'alpha_num' => ':attributeは、アルファベット、数字のみで入力してください。',
    'array' => ':attributeは、配列でなければなりません。',
    'before' => ':attributeは、:date以前の日付にしてください。',
    'before_or_equal' => ':attributeは、:date以前の日付にしてください。',
    'between' => [
        'array' => ':attributeは、:min個から:max個までのアイテムを含んでいる必要があります。',
        'file' => ':attributeは、:minから:maxキロバイトの間でなければなりません。',
        'numeric' => ':attributeは、:minから:maxの間でなければなりません。',
        'string' => ':attributeは、:min文字から:max文字の間でなければなりません。',
    ],
    'boolean' => ':attributeは、trueまたはfalseでなければなりません。',
    'confirmed' => ':attributeの確認が一致しません。',
    'current_password' => '現在のパスワードが正しくありません。',
    'date' => ':attributeは、有効な日付ではありません。',
    'date_equals' => ':attributeは、:dateと同じ日付でなければなりません。',
    'date_format' => ':attributeは、:format形式と一致しません。',
    'different' => ':attributeと:otherは、異なっている必要があります。',
    'digits' => ':attributeは、:digits桁でなければなりません。',
    'digits_between' => ':attributeは、:min桁から:max桁の間でなければなりません。',
    'dimensions' => ':attributeの画像サイズが無効です。',
    'distinct' => ':attributeには、重複する値が含まれています。',
    'doesnt_end_with' => ':attributeは、次のいずれかで終わってはいけません: :values。',
    'doesnt_start_with' => ':attributeは、次のいずれかで始まってはいけません: :values。',
    'email' => ':attributeは、有効なメールアドレスでなければなりません。',
    'ends_with' => ':attributeは、次のいずれかで終わらなければなりません: :values。',
    'enum' => '選択された:attributeは無効です。',
    'exists' => '選択された:attributeは無効です。',
    'file' => ':attributeは、ファイルでなければなりません。',
    'filled' => ':attributeは、値が必要です。',
    'gt' => [
        'array' => ':attributeは、:value個より多くのアイテムを持っている必要があります。',
        'file' => ':attributeは、:valueキロバイトより大きい必要があります。',
        'numeric' => ':attributeは、:valueより大きい必要があります。',
        'string' => ':attributeは、:value文字より大きい必要があります。',
    ],
    'gte' => [
        'array' => ':attributeは、:value個以上のアイテムを持っている必要があります。',
        'file' => ':attributeは、:valueキロバイト以上である必要があります。',
        'numeric' => ':attributeは、:value以上である必要があります。',
        'string' => ':attributeは、:value文字以上である必要があります。',
    ],
    'image' => ':attributeは、画像でなければなりません。',
    'in' => '選択された:attributeは無効です。',
    'in_array' => ':attributeは、:otherに存在しません。',
    'integer' => ':attributeは、整数でなければなりません。',
    'ip' => ':attributeは、有効なIPアドレスでなければなりません。',
    'ipv4' => ':attributeは、有効なIPv4アドレスでなければなりません。',
    'ipv6' => ':attributeは、有効なIPv6アドレスでなければなりません。',
    'json' => ':attributeは、有効なJSON文字列でなければなりません。',
    'lt' => [
        'array' => ':attributeは、:value個より少ないアイテムを持っている必要があります。',
        'file' => ':attributeは、:valueキロバイトより小さい必要があります。',
        'numeric' => ':attributeは、:valueより小さい必要があります。',
        'string' => ':attributeは、:value文字より小さい必要があります。',
    ],
    'lte' => [
        'array' => ':attributeは、:value個以下のアイテムを持っている必要があります。',
        'file' => ':attributeは、:valueキロバイト以下である必要があります。',
        'numeric' => ':attributeは、:value以下である必要があります。',
        'string' => ':attributeは、:value文字以下である必要があります。',
    ],
    'max' => [
        'array' => ':attributeは、:max個を超えてはいけません。',
        'file' => ':attributeは、:maxキロバイトを超えてはいけません。',
        'numeric' => ':attributeは、:maxを超えてはいけません。',
        'string' => ':attributeは、:max文字を超えてはいけません。',
    ],
    'mimes' => ':attributeは、:valuesタイプのファイルでなければなりません。',
    'mimetypes' => ':attributeは、:valuesタイプのファイルでなければなりません。',
    'min' => [
        'array' => ':attributeは、最低:max個のアイテムが必要です。',
        'file' => ':attributeは、最低:maxキロバイトでなければなりません。',
        'numeric' => ':attributeは、最低:maxでなければなりません。',
        'string' => ':attributeは、最低:max文字でなければなりません。',
    ],
    'multiple_of' => ':attributeは、:valueの倍数でなければなりません。',
    'not_in' => '選択された:attributeは無効です。',
    'not_regex' => ':attributeの形式が無効です。',
    'numeric' => ':attributeは、数字でなければなりません。',
    'password' => 'パスワードが正しくありません。',
    'present' => ':attributeが存在している必要があります。',
    'regex' => ':attributeの形式が無効です。',
    'required' => ':attributeは、必須です。',
    'required_if' => ':otherが:valueの場合、:attributeは必須です。',
    'required_unless' => ':otherが:values以外の場合、:attributeは必須です。',
    'required_with' => ':valuesが存在する場合、:attributeは必須です。',
    'required_with_all' => ':valuesがすべて存在する場合、:attributeは必須です。',
    'required_without' => ':valuesが存在しない場合、:attributeは必須です。',
    'required_without_all' => ':valuesがすべて存在しない場合、:attributeは必須です。',
    'prohibited' => ':attributeフィールドは禁止されています。',
    'prohibited_if' => ':otherが:valueの場合、:attributeフィールドは禁止されています。',
    'prohibited_unless' => ':otherが:valuesのいずれかでない場合、:attributeフィールドは禁止されています。',
    'same' => ':attributeと:otherは一致している必要があります。',
    'size' => [
        'array' => ':attributeは、:size個のアイテムを含んでいる必要があります。',
        'file' => ':attributeは、:sizeキロバイトでなければなりません。',
        'numeric' => ':attributeは、:sizeでなければなりません。',
        'string' => ':attributeは、:size文字でなければなりません。',
    ],
    'starts_with' => ':attributeは、次のいずれかで始まらなければなりません: :values。',
    'string' => ':attributeは、文字列でなければなりません。',
    'timezone' => ':attributeは、有効なタイムゾーンでなければなりません。',
    'unique' => ':attributeは既に使用されています。',
    'uploaded' => ':attributeのアップロードに失敗しました。',
    'url' => ':attributeの形式が無効です。',
    'uuid' => ':attributeは、有効なUUIDでなければなりません。',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'カスタムメッセージ',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'last_name' => '苗字',
        'first_name' => '名前',
        'email' => 'メールアドレス',
        'password' => 'パスワード',
        'high_school' => '高校名',
        'first_choice_university' => '第一志望大学',
        'first_choice_faculty' => '第一志望学部',
        'birth_date' => '生年月日',
        'gender' => '性別',
    ],

];
