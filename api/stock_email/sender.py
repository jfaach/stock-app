from django.core.mail import send_mail


class Email:
    def __init__(self, from_mail, to_mail, subject, message):
        self.from_mail = from_mail
        self.to_mail = to_mail
        self.subject = subject
        self.message = message

    def send(self):
        send_mail(
            self.subject,
            self.message,
            self.from_mail,
            [self.to_mail],
            fail_silently=False,
        )
