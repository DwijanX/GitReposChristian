#pragma once
#include "Node.h"
#include <fstream>
#define black 0
#define red 4

template <class T>
class AVL
{
private:
    Node<T>* Root;
   
    void insertAlg(T* Data, Node<T>*& LocalRoot, bool& Continue);
   
    void setColor(int color, Node<T>* LocalRoot);
    void simpleLeftRotation(Node<T>*& node);
    void simpleRightRotation(Node<T>*& node);
    void compoundRightRotation(Node<T>*& node);
    void compoundLeftRotation(Node<T>*& node);

    void ShowXLevelAlg(void(*funcToShow)(T*), int* SearchedLevel, int LocalLevel, Node<T>* LocalRoot);
    int getHeightAlg(Node<T>* LocalRoot);
    int getBlackHeightAlg(Node<T>* LocalRoot);
    bool verifyThatEachSonOfRedNodeIsBlackAlg(Node<T>* LocalRoot,int FatherColor);
    int CountNodesWOneSonAlg(Node<T>* LocalRoot);


public:
    AVL();
    ~AVL();
    void insert(T Data);
    void ShowTree(void(*funcToShow)(T*));
    void ShowXLevel(void(*funcToShow)(T*), int level);
    int getHeight();
    int getBlackHeight();
    void insertFromFile(string FileDirection);
    bool verifyThatEachSonOfRedNodeIsBlack();
    int CountNodesWOneSon();
};
template <class T>
AVL<T>::AVL()
{
    Root = NULL;
}
template <class T>
AVL<T>::~AVL()
{
    delete Root;
}
template <class T>
void AVL<T>::insertAlg(T* Data, Node<T>*& LocalRoot, bool& Continue)
{
    if (LocalRoot == NULL)
    {
        LocalRoot = new Node<T>(Data, 0);
        Continue=true;
    }
    else
    {
        if (*Data < *LocalRoot->getData())
        {
            insertAlg(Data, LocalRoot->getLeft(), Continue);
            if (Continue)
            {
                LocalRoot->addToFactor(1);
                if(LocalRoot->getFactor()==0)
                {
                    Continue=false;
                }
                else
                {
                    if(LocalRoot->getFactor()==2)
                    {
                        Continue=false;
                        if(LocalRoot->getLeft()->getFactor()==1)
                        {
                            simpleRightRotation(LocalRoot);
                        }
                        else
                        {
                            compoundRightRotation(LocalRoot);
                            //rotar der compuesto root
                        }
                    }
                }
            }

        }
        if (*Data > *LocalRoot->getData())
        {
            insertAlg(Data, LocalRoot->getRight(), Continue);
            if (Continue)
            {
                LocalRoot->addToFactor(-1);
                if(LocalRoot->getFactor()==0)
                {
                    Continue=false;
                }
                else
                {
                    if(LocalRoot->getFactor()==-2)
                    {
                        Continue=false;
                        if(LocalRoot->getRight()->getFactor()==-1)
                        {
                            simpleLeftRotation(LocalRoot);
                        }
                        else
                        {
                            compoundLeftRotation(LocalRoot);
                        }
                    }
                }
            }
        }
    }

}
template <class T>
void AVL<T>::simpleLeftRotation(Node<T>*& node)
{
    Node<T>* temp = NULL;
    Node<T>* NewRoot = node->getRight();
    if (NewRoot->getLeft() != NULL)
    {
        temp = NewRoot->getLeft();
    }
    NewRoot->setLeft(node);
    node->setRight(temp);
    node = NewRoot;
    node->setFactor(0);
    node->getLeft()->setFactor(0);
}
template <class T>
void AVL<T>::simpleRightRotation(Node<T>*& node)
{
    Node<T>* temp = NULL;
    Node<T>* NewRoot = node->getLeft();
    if (NewRoot->getRight() != NULL)
    {
        temp = NewRoot->getRight();
    }
    NewRoot->setRight(node);
    node->setLeft(temp);
    node = NewRoot;
    node->setFactor(0);
    node->getRight()->setFactor(0);
}
template <class T>
void AVL<T>::compoundRightRotation(Node<T>*& node)
{
    Node<T>* NewRoot = node->getLeft()->getRight();
    Node<T>* tempL=NewRoot->getLeft();
    Node<T>* tempR=NewRoot->getRight();
    NewRoot->setLeft(node->getLeft());
    NewRoot->setRight(node);
    NewRoot->getLeft()->setRight(tempL);
    NewRoot->getRight()->setLeft(tempR);
    node=NewRoot;
    if(node->getFactor()==0)
    {
        node->getLeft()->setFactor(0);
        node->getRight()->setFactor(0);
    }
    else if(node->getFactor()==1)
    {
        node->getLeft()->setFactor(0);
        node->getRight()->setFactor(-1);
        node->setFactor(0);
    }
    else
    {
        node->getLeft()->setFactor(1);
        node->getRight()->setFactor(0);
        node->setFactor(0);
    }
}
template <class T>
void AVL<T>::compoundLeftRotation(Node<T>*& node)
{
    Node<T>* NewRoot = node->getRight()->getLeft();

    Node<T>* tempL=NewRoot->getLeft();
    Node<T>* tempR=NewRoot->getRight();

    NewRoot->setLeft(node);
    NewRoot->setRight(node->getRight());
    
    NewRoot->getRight()->setLeft(tempR);
    NewRoot->getLeft()->setRight(tempL);
    node=NewRoot;
    if(node->getFactor()==0)
    {
        node->getLeft()->setFactor(0);
        node->getRight()->setFactor(0);
    }
    else if(node->getFactor()==1)
    {
        node->getLeft()->setFactor(0);
        node->getRight()->setFactor(-1);
        node->setFactor(0);
    }
    else
    {
        node->getLeft()->setFactor(1);
        node->getRight()->setFactor(0);
        node->setFactor(0);
    }
}
template <class T>
void AVL<T>::insert(T Data)
{
    bool Continue;
    insertAlg(new T(Data), Root, Continue);
}
template<class T>
void AVL<T>::ShowXLevelAlg(void(*funcToShow)(T*), int* SearchedLevel, int LocalLevel, Node<T>* LocalRoot)
{
    if (LocalRoot != NULL)
    {
        if (*SearchedLevel != LocalLevel)
        {
            ShowXLevelAlg(funcToShow, SearchedLevel, LocalLevel + 1, LocalRoot->getLeft());
            ShowXLevelAlg(funcToShow, SearchedLevel, LocalLevel + 1, LocalRoot->getRight());
        }
        else
        {
            LocalRoot->show(funcToShow);
        }
    }
}
template<class T>
void AVL<T>::ShowXLevel(void(*funcToShow)(T*), int level)
{
    ShowXLevelAlg(funcToShow, &level, 1, Root);
}
template<class T>
int AVL<T>::getHeightAlg(Node<T>* LocalRoot)
{
    int ans = 0;
    int aux1, aux2;
    if (LocalRoot != NULL)
    {
        aux1 = getHeightAlg(LocalRoot->getLeft());
        aux2 = getHeightAlg(LocalRoot->getRight());
        if (aux2 > aux1)
            ans += 1 + aux2;
        else
            ans += 1 + aux1;
    }
    return ans;
}
template<class T>
int AVL<T>::getHeight()
{
    return getHeightAlg(Root);
}
template <class T>
void AVL<T>::ShowTree(void(*funcToShow)(T*))
{
    int height = getHeight();
    for (int i = 1; i <= height; i++)
    {
        ShowXLevel(funcToShow, i);
        cout << '\n';
    }
}
template <class T>
void AVL<T>::insertFromFile(string FileDirection)
{
    if(sizeof(T)==sizeof(int))
    {
        int aux;
        ifstream File;
        File.open(FileDirection);
        while(File>>aux)
        {
            insert(aux);
        }
    }
}
template <class T>
bool AVL<T>::verifyThatEachSonOfRedNodeIsBlackAlg(Node<T>* LocalRoot,int FatherColor)
{
    bool Ans=true;
    if(LocalRoot!=NULL)
    {
        if(FatherColor==red && LocalRoot->getColor()==red)
        {
            Ans=false;
        }
        else
        {
            Ans=verifyThatEachSonOfRedNodeIsBlackAlg(LocalRoot->getLeft(),LocalRoot->getColor());
            if(Ans!=false)
            {
                Ans=verifyThatEachSonOfRedNodeIsBlackAlg(LocalRoot->getRight(),LocalRoot->getColor());
            }
        }
    }
    return Ans;
}
template <class T>
bool AVL<T>::verifyThatEachSonOfRedNodeIsBlack()
{
    return verifyThatEachSonOfRedNodeIsBlackAlg(Root,black);
}
template <class T>
int AVL<T>::getBlackHeightAlg(Node<T>* LocalRoot)
{
    int ans = 0;
    int aux1, aux2;
    if (LocalRoot != NULL)
    {
        aux1 = getBlackHeightAlg(LocalRoot->getLeft());
        aux2 = getBlackHeightAlg(LocalRoot->getRight());
        if(LocalRoot->getColor()==black)
        {
            ans+=1;
        }
        if (aux2 > aux1)
            ans +=  aux2;
        else
            ans +=  aux1;
    }
    return ans;
}
template<class T>
int AVL<T>::getBlackHeight()
{
    return getBlackHeightAlg(Root);
}
template<class T>
int AVL<T>::CountNodesWOneSonAlg(Node<T>* LocalRoot)
{
    int ans=0;
    if(LocalRoot->getLeft()!=NULL && LocalRoot->getRight()!=NULL)
    {
        ans+=CountNodesWOneSonAlg(LocalRoot->getLeft());
        ans+=CountNodesWOneSonAlg(LocalRoot->getRight());
    }
    else
    {
        if(LocalRoot->getLeft()!=NULL)
        {
          ans+=1+CountNodesWOneSonAlg(LocalRoot->getLeft());
        }
        else if(LocalRoot->getRight()!=NULL)
        {
            ans+=1+CountNodesWOneSonAlg(LocalRoot->getRight());
        }
    }
    return ans;
}
template<class T>
int AVL<T>::CountNodesWOneSon()
{
    return CountNodesWOneSonAlg(Root);
}