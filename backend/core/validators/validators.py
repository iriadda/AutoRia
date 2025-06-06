
from better_profanity import profanity

profanity.load_censor_words_from_file("core/validators/ukrainian_bad_words.txt")

# def validate_no_profanity(value):
#     result = profanity.contains_profanity(value)
#     print(f"Is obscene language: {result}")
#     # if result:
#     #     raise ValidationError("The description contains obscene language..")
#     return

def has_profanity(value: str) -> bool:
    result = profanity.contains_profanity(value)
    print(f"Is obscene language: {result}")
    return result