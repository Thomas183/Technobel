import colorama
import random
import os
import time
import math
#┌─┐
#│ │
#└─┘
#Games Lost / Won Statistics
gameLost = 0
gamesWon = 0
#Array of words (Index 0 = Difficulty)
easyWords = ['Facile', 'ARBRE']
mediumWords = ['Normal', 'CONTROLLEUR']
hardWords = ['Difficile', 'GEOLOGIQUEMENT']
lettersValidationList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
#Pictures of hangman (0-6)
hangman = ['''\
   ┌───────┐
   │       │
   │       
   │      
   │      
   │
──────''','''\
   ┌───────┐
   │       │
   │       O
   │      
   │      
   │
──────''','''\
   ┌───────┐
   │       │
   │       O
   │       │
   │      
   │
──────''','''\
   ┌───────┐
   │       │
   │       O
   │      /│
   │      
   │
──────''','''\
   ┌───────┐
   │       │
   │       O
   │      /│\\
   │      
   │
──────''','''\
   +───────┐
   │       │
   │       O
   │      /│\\
   │      / 
   │
──────''','''\
   ┌───────┐
   │       │
   │       O
   │      /│\\
   │      / \\
   │
──────''']

#Function to put a border arround a string
def borderText(text : str, verticalPadding : int, horizontalPadding : int) :
    textArray = text.splitlines()
    maxLength = max(len(x) for x in textArray) + horizontalPadding
    borderedText = [f'┌{"─" * maxLength}┐']
    for x in range(verticalPadding) :
        borderedText.append(f'│{" " * maxLength}│')
    for x, y in enumerate(textArray) :
        length = len(textArray[x])
        if horizontalPadding % 2 == 0 :
            borderedText.append(f'│{" " * (((maxLength-len(y))//2)) if len(y)%2 == 0 or len(y) == 0 else " " * int(math.ceil((((maxLength-len(y))/2))))}{y}{" " * int(math.floor((((maxLength-len(y))/2))))}│')
        else :
            borderedText.append(f'│{" " * (((maxLength-len(y))//2)+1) if len(y)%2 == 0 or len(y) == 0 else " " * int(math.ceil((((maxLength-len(y))/2))))}{y}{" " * int(math.floor((((maxLength-len(y))/2))))}│')
    for x in range(verticalPadding) :
        borderedText.append(f'│{" " * maxLength}│')
    borderedText.append(f'└{"─" * maxLength}┘')
    return '\n'.join(borderedText)

#Function to center a multiline string based on the console horizontal size
def multiLineCenterText(text : str) :
    width = os.get_terminal_size().columns
    print('\n'.join(line.center(width) for line in text.split('\n')))

#Function to set the difficulty
def setDifficulty(difficulty : str) :
    global wordToGuess
    global wordToGuessIndex
    global isInputValid
    global rightUserGuesses
    wordToGuess = difficulty[random.randint(1, len(difficulty)-1)]
    wordToGuessIndex = difficulty.index(wordToGuess)
    isInputValid = True
    for x in wordToGuess :
        rightUserGuesses.append('_')
    os.system('cls')
    multiLineCenterText(borderText(f'Vous avez choisi la difficulté {difficulty[0]}', 1, 11))
    time.sleep(2)

#Welcome message
print(colorama.Style.RESET_ALL)
print(colorama.Fore.GREEN)
multiLineCenterText(borderText(f'Bienvenue sur le jeu du pendu ! =)', 1, 11))
time.sleep(3)
print(colorama.Style.RESET_ALL)
os.system('cls')

#Keeplaying Loop (Load default values)
keepPlaying = True
while keepPlaying :
    rightUserGuesses = []
    wrongUserGuesses = []
    isInputValid = False
    hasWon = False
    hasLost = False
    guessesLeft = 6
    #Display of statistics :
    os.system('cls')

#Ask the User the desired difficulty and set it
    while not isInputValid:
        os.system('cls')
        print(f'Nombre de parties gagnées : {gamesWon}\nNombre de parties perdues : {gameLost}\n───────────────────────────────\n')
        userInput = input('\nVeuillez choisir une difficulté :\n\n1 : Facile => 5 à 6 Lettres\n2 : Normal => 7 à 10 Lettres\n3 : Difficile => 12 à 26 Lettres\n ─> ')
        match userInput :
            case '1' :
                setDifficulty(easyWords)
            case '2' :
                setDifficulty(mediumWords)
            case '3' :
                setDifficulty(hardWords)
            case _:
                os.system('cls')
                print('Mauvais entrée, veuillez entrer une difficulté entre 1 et 3\n\n')
                time.sleep(1.5)

    #Game Loop
    print(wordToGuess)
    while hasLost == False and hasWon == False:
        os.system('cls')
        #---Draw Interface---#
        #Find border length
        printLetterUsed = 'Lettres déjà utilisées : '
        for x in wrongUserGuesses :
            printLetterUsed += ' │ ' + x  + ' '
        length = len(printLetterUsed)
        #Storing each line in a array and using \n.join to line break
        print(f'{hangman[6-guessesLeft]}     {" ".join(rightUserGuesses)}')
        print(borderText(f'Lettres déjà utilisées : {" | ".join(wrongUserGuesses)}', 0, 0))
        #User input validation
        isInputValid = False
        while isInputValid == False :
            userInput = input('Choisissez une lettre (A-Z) :\n -> ')
            if userInput in lettersValidationList :
                userInput = userInput.capitalize()
                isInputValid = True
        #------#
        #Check if user guess is in word to guess or not, enable hasLost or hasWon if pertinent
        if userInput in wordToGuess :
            for x, y in enumerate(wordToGuess) :
                if userInput == y :
                    rightUserGuesses[x] = y
            if rightUserGuesses == list(wordToGuess) :
                hasWon = True
        elif userInput not in wordToGuess and userInput not in wrongUserGuesses :
            wrongUserGuesses.append(userInput)
            guessesLeft -= 1
            if guessesLeft == 0 :
                hasLost = True
        elif userInput not in wordToGuess and userInput in wrongUserGuesses :
            os.system('cls')
            print(borderText('Lettre Déjà utilisée : Veuillez en entrer une autre', 1, 11))
            time.sleep(1.5)
            os.system('cls')
    #Exit of game loop because user has won or lost -> Check which one it is
    os.system('cls')
    if hasWon:
        multiLineCenterText(borderText('Bravo, C\'est gagné  ! :D', 1, 11))
        gamesWon += 1
        time.sleep(3)
    elif hasLost:
        multiLineCenterText(borderText(f'C\'est perdu ! :( le mot était {wordToGuess}', 1, 11))
        gameLost += 1
        time.sleep(3)
    else :
        exit('ERROR : UNEXPECTED CASE: 1')
    #Ask User if he wants to play again
    isInputValid = False
    while not isInputValid:
        os.system('cls')
        userInput = input('\nVoulez-vous rejouer ?\n1 : OUI\n2 : NON\n -> ')
        match userInput :
            case '1' :
                isInputValid = True
            case '2' :
                isInputValid = True
                keepPlaying = False
                multiLineCenterText((borderText('Au revoir o/', 1, 11)))
            case _: 
                multiLineCenterText('Mauvaise Entrée')