# sampleText = '''\
# harry pot de fleura
# à l'école de eqfsokijhmse
# esqgfsegesg
# desgqedses
# segsqgfs
# '''


# def borderText(text : str, verticalPadding : int, horizontalPadding : int, square : bool) :
#     textArray = text.splitlines()
#     maxLength = max(len(x) for x in textArray) + horizontalPadding
#     borderedText = [f'┌{"─" * maxLength}┐']
#     for x in range(verticalPadding) :
#         borderedText.append(f'│{" " * maxLength}│')
#     for x, y in enumerate(textArray) :
#         length = len(textArray[x])
#         if horizontalPadding % 2 == 0 :
#             borderedText.append(f'│{" " * (((maxLength-len(y))//2)+1) if len(y)%2 == 0 or len(y) == 0 else " " * (((maxLength-len(y))//2))}{y}{" " * ((maxLength-len(y))//2)}│')
#         else :
#             borderedText.append(f'│{" " * (((maxLength-len(y))//2)) if len(y)%2 == 0 or len(y) == 0 else " " * (((maxLength-len(y))//2)+1)}{y}{" " * ((maxLength-len(y))//2)}│')
#     for x in range(verticalPadding) :
#         borderedText.append(f'│{" " * maxLength}│')
#     borderedText.append(f'└{"─" * maxLength}┘')
#     return '\n'.join(borderedText)

# def multiLineCenterText(text : str) :
#     import os
#     width = os.get_terminal_size().columns
#     print('\n'.join(line.center(width) for line in text.split('\n')))

# multiLineCenterText(borderText(sampleText, 0, 0, True))


#┌ ─ ┐# │ #└ ─ ┘