from django.db import models
from django.core import validators
from users.models import User


class Item(models.Model):
    """
    データ定義クラス
      各フィールドを定義する
    参考：
    ・公式 モデルフィールドリファレンス
    https://docs.djangoproject.com/ja/2.1/ref/models/fields/
    """

    SEX_CHOICES = (
        (1, 'MALE'),
        (2, 'FEMALE'),
        (3, 'OTHER'),
    )

    name = models.CharField(
        verbose_name='NAME',
        max_length=200,
        null=True,
    )

    age = models.IntegerField(
        verbose_name='AGE',
        validators=[validators.MinValueValidator(1)],
        blank=True,
        null=True,
    )

    sex = models.IntegerField(
        verbose_name='SEX',
        choices=SEX_CHOICES,
        default=1
    )

    memo = models.TextField(
        verbose_name='MEMO',
        max_length=300,
        blank=True,
        null=True,
    )

    
    # 以下、管理項目

    # 作成者(ユーザー)
    created_by = models.ForeignKey(
        User,
        verbose_name='CREATER',
        blank=True,
        null=True,
        related_name='CreatedBy',
        on_delete=models.SET_NULL,
        editable=False,
    )

    # 作成時間
    created_at = models.DateTimeField(
        verbose_name='CREATE TIME',
        blank=True,
        null=True,
        editable=False,
    )

    # 更新者(ユーザー)
    updated_by = models.ForeignKey(
        User,
        verbose_name='UPDATER',
        blank=True,
        null=True,
        related_name='UpdatedBy',
        on_delete=models.SET_NULL,
        editable=False,
    )

    # 更新時間
    updated_at = models.DateTimeField(
        verbose_name='UPDATE TIME',
        blank=True,
        null=True,
        editable=False,
    )

    def __str__(self):
        """
        リストボックスや管理画面での表示
        """
        return self.name

    class Meta:
        """
        管理画面でのタイトル表示
        """
        verbose_name = 'アイテム'
        verbose_name_plural = 'アイテム'
