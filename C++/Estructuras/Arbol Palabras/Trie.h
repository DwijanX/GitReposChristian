#pragma once
#include "Node.h"
template <class T>
class Trie
{
private:
    Node<T>* Root;
    int CharFunction(char Character);
    void insertWordAlgorithm(string Word, int Level, Node<T>*& LocalRoot);
    bool deleteWordAlg(string Word,int Level, Node<T>*& LocalRoot);
    bool VerifyIfWordExistsAlg(string Word,int Level,Node<T>* LocalRoot);
public:
    Trie();
    ~Trie();
    void insertWord(string Word);
    void deleteWord(string Word);
    bool VerifyIfWordExists(string Word);
};


template <class T>
Trie<T>::Trie()
{
    Root = NULL;
}
template <class T>
Trie<T>::~Trie()
{
    delete Root;
}

template <class T>
int Trie<T>::CharFunction(char Character)
{
    return Character - 97;
}
template <class T>
void Trie<T>::insertWordAlgorithm(string Word, int Level, Node<T>*& LocalRoot)
{
    int CharPosition = CharFunction(Word[Level]);
    if(LocalRoot==NULL)
        LocalRoot=new Node<T>;
    if(Word.size()==Level+1)
    {
        LocalRoot->setTrueorFalseXPos(CharPosition, true);
    }
    else
    {
        insertWordAlgorithm(Word, Level + 1, LocalRoot->getNextNodeOfXPos(CharPosition));
    }
}

template <class T>
void Trie<T>::insertWord(string Word)
{
    insertWordAlgorithm(Word, 0, Root);
}
template <class T>
bool Trie<T>::deleteWordAlg(string Word,int Level, Node<T>*& LocalRoot)
{
    bool ans=false;
    if (Word.size() > Level)
    {
        if(LocalRoot!=NULL)
        {
            int CharPosition = CharFunction(Word[Level]);
            bool TheresNothingBelow=deleteWordAlg(Word,Level+1,LocalRoot->getNextNodeOfXPos(CharPosition));
            if(Word.size()==Level+1)
            {
                LocalRoot->setTrueorFalseXPos(CharPosition,false);
            }
            if(TheresNothingBelow && LocalRoot->VerifyIfNodeCanBeDeleted())
            {
                delete LocalRoot;
                LocalRoot=NULL;
                ans=true;
            }
            
        }
    }
    else if(LocalRoot==NULL)
        ans=true;
    return ans;
}
template <class T>
void Trie<T>::deleteWord(string Word)
{
    deleteWordAlg(Word,0,Root);
}
template <class T>
bool Trie<T>::VerifyIfWordExistsAlg(string Word,int Level,Node<T>* LocalRoot)
{
    bool ans=false;
    if (Word.size() > Level)
    {
        if(LocalRoot!=NULL)
        {
            int CharPosition = CharFunction(Word[Level]);
            if(LocalRoot->getBoolOfXPos(CharPosition) && Word.size()==Level+1)
            {
                ans=true;
            }
            else
            {
                ans=VerifyIfWordExistsAlg(Word,Level+1,LocalRoot->getNextNodeOfXPos(CharPosition));
            }
        }
    }
    return ans;
}
template <class T>
bool Trie<T>::VerifyIfWordExists(string Word)
{
    return VerifyIfWordExistsAlg(Word,0,Root);
}
