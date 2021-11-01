#include <iostream>
#include "dict.cpp"
using namespace std;

int main()
{
    Dict DictionarySpanishToX;
    DictionarySpanishToX.insertWord("casa","House","English");
    DictionarySpanishToX.insertWord("casa","家","chino");
    DictionarySpanishToX.insertWord("casa","घर","hindi");
    cout<<DictionarySpanishToX.searchTransalteOfAWordInXLanguage("CaSa","hindi")<<endl;
    cout<<DictionarySpanishToX.searchTransalteOfAWordInXLanguage("CaSa","chino")<<endl;
    cout<<DictionarySpanishToX.searchTransalteOfAWordInXLanguage("CaSa","french")<<endl;
    return 0;
}