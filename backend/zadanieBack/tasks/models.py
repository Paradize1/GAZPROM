from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Выполнена'),
        ('pending', 'Невыполнена'),
    ]

    title = models.CharField(max_length=200)  # Заголовок
    description = models.TextField(blank=True, null=True)            # Описание
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')  # Статус
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания

    def __str__(self):
        return self.title
