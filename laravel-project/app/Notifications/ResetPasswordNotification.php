<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class ResetPasswordNotification extends ResetPassword
{
    protected $userType;

    public function __construct($token, $userType)
    {
        parent::__construct($token);
        $this->userType = $userType;
    }

    public function toMail($notifiable)
    {
       $resetUrlPath = $this->userType === 'student' ? 'student/reset-password' : 'tutor/reset-password';

       $url = url(config('app.frontend_url') . '/' . $resetUrlPath . '?token=' . $this->token . '&userType' . $this->userType);

        return (new MailMessage)
            ->line('アカウントのパスワードリセットリクエストを受け取りました。')
            ->action('パスワードをリセット', $url)
            ->line('このパスワードリセットリンクは、:count分で有効期限が切れます。', ['count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire')])
            ->line('もしパスワードリセットをリクエストしていない場合、これ以上の操作は不要です。');
    }

}
