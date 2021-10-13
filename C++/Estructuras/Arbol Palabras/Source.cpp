#include <iostream>
#include "Trie.h"
using namespace std;

int main()
{
    Trie<string> TrieAux;
    TrieAux.insertWord("aaa");
    TrieAux.insertWord("aba");
    TrieAux.insertWord("perico");
    TrieAux.insertWord("pericoo");
    cout<<"eliminando aaa\n";
    TrieAux.deleteWord("aaa");
    cout<<"eliminando peric\n";
    TrieAux.deleteWord("peric");
    cout<<"eliminando pericoo\n";
    TrieAux.deleteWord("pericoo");
    cout<<"Buscando perico\n";
    if(TrieAux.VerifyIfWordExists("perico"))
    {
        cout<<"existe\n";
    }
    else
        cout<<"No existe\n";
    cout<<"Buscando aaa\n";
    if(TrieAux.VerifyIfWordExists("aaa"))
    {
        cout<<"existe\n";
    }
    else
        cout<<"No existe\n";
    cout<<"Buscando aba\n";
    if(TrieAux.VerifyIfWordExists("aba"))
    {
        cout<<"existe\n";
    }
    else
        cout<<"No existe\n";
    return 0;
}