#pragma once
#include "Node.h"
#include <fstream>
#define black 0
#define red 4

template <class T>
class BRTree
{
private:
    Node<T>* Root;
    void insertAlg(T* Data, Node<T>*& LocalRoot, bool& Continue, bool& ParityEven, bool& left);
    void setColor(int color, Node<T>* LocalRoot);
    void RotateLeft(Node<T>*& node);
    void RotateRight(Node<T>*& node);
    void ShowXLevelAlg(void(*funcToShow)(T*), int* SearchedLevel, int LocalLevel, Node<T>* LocalRoot);
    int getHeightAlg(Node<T>* LocalRoot);
    int getBlackHeightAlg(Node<T>* LocalRoot);
    bool verifyThatEachSonOfRedNodeIsBlackAlg(Node<T>* LocalRoot,int FatherColor);
    int CountNodesWOneSonAlg(Node<T>* LocalRoot);


public:
    BRTree();
    ~BRTree();
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
BRTree<T>::BRTree()
{
    Root = NULL;
}
template <class T>
BRTree<T>::~BRTree()
{
    delete Root;
}
template <class T>
void BRTree<T>::insertAlg(T* Data, Node<T>*& LocalRoot, bool& Continue, bool& ParityEven, bool& leftSide)
{
    if (LocalRoot == NULL)
    {
        LocalRoot = new Node<T>(Data, red);
        Continue = true;
        ParityEven = true;
    }
    else
    {
        if (*Data < *LocalRoot->getData())
        {
            insertAlg(Data, LocalRoot->getLeft(), Continue, ParityEven, leftSide);
            if (Continue)
            {
                if (ParityEven)
                {
                    if (LocalRoot->getColor() == black)
                    {
                        Continue = false;
                    }
                    else
                    {
                        ParityEven = false;
                        leftSide = true;
                    }
                }
                else
                {
                    if (LocalRoot->getRight() != NULL && LocalRoot->getRight()->getColor() == red)
                    {
                        LocalRoot->getLeft()->setColor(black);
                        LocalRoot->getRight()->setColor(black);
                        LocalRoot->setColor(red);
                        ParityEven = true;
                    }
                    else
                    {
                        Continue = false;
                        if (leftSide == false)
                        {
                            RotateLeft(LocalRoot->getLeft());
                            //rotar izquierda(raiz subizq)
                        }
                        LocalRoot->getLeft()->setColor(black);
                        LocalRoot->setColor(red);
                        RotateRight(LocalRoot);
                        // rotar derecha(raiz )
                    }

                }

            }
        }
        if (*Data > *LocalRoot->getData())
        {
            insertAlg(Data, LocalRoot->getRight(), Continue, ParityEven, leftSide);
            if (Continue)
            {
                if (ParityEven)
                {
                    if (LocalRoot->getColor() == black)
                    {
                        Continue = false;
                    }
                    else
                    {
                        ParityEven = false;
                        leftSide = false;
                    }
                }
                else
                {
                    if (LocalRoot->getLeft() != NULL && LocalRoot->getLeft()->getColor() == red)
                    {
                        LocalRoot->getLeft()->setColor(black);
                        LocalRoot->getRight()->setColor(black);
                        LocalRoot->setColor(red);
                        ParityEven = true;
                    }
                    else
                    {
                        Continue = false;
                        if (leftSide)
                        {
                            RotateRight(LocalRoot->getRight());
                            //rotar derecha(Raiz.subder)
                        }
                        LocalRoot->getRight()->setColor(black);
                        LocalRoot->setColor(red);
                        RotateLeft(LocalRoot);
                        //rotar izq(Raiz)

                    }

                }

            }
        }
    }

}
template <class T>
void BRTree<T>::RotateLeft(Node<T>*& node)
{
    Node<T>* Floating = NULL;
    Node<T>* NewRoot = node->getRight();
    if (NewRoot->getLeft() != NULL)
    {
        Floating = NewRoot->getLeft();
    }
    NewRoot->setLeft(node);
    node->setRight(Floating);
    node = NewRoot;
}
template <class T>
void BRTree<T>::RotateRight(Node<T>*& node)
{
    Node<T>* Floating = NULL;
    Node<T>* NewRoot = node->getLeft();
    if (NewRoot->getRight() != NULL)
    {
        Floating = NewRoot->getRight();
    }
    NewRoot->setRight(node);
    node->setLeft(Floating);
    node = NewRoot;
}
template <class T>
void BRTree<T>::insert(T Data)
{
    bool Continue, ParityEven, leftSide;
    insertAlg(new T(Data), Root, Continue, ParityEven, leftSide);
    Root->setColor(black);
}
template<class T>
void BRTree<T>::ShowXLevelAlg(void(*funcToShow)(T*), int* SearchedLevel, int LocalLevel, Node<T>* LocalRoot)
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
void BRTree<T>::ShowXLevel(void(*funcToShow)(T*), int level)
{
    ShowXLevelAlg(funcToShow, &level, 1, Root);
}
template<class T>
int BRTree<T>::getHeightAlg(Node<T>* LocalRoot)
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
int BRTree<T>::getHeight()
{
    return getHeightAlg(Root);
}
template <class T>
void BRTree<T>::ShowTree(void(*funcToShow)(T*))
{
    int height = getHeight();
    for (int i = 1; i <= height; i++)
    {
        ShowXLevel(funcToShow, i);
        cout << '\n';
    }
}
template <class T>
void BRTree<T>::insertFromFile(string FileDirection)
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
bool BRTree<T>::verifyThatEachSonOfRedNodeIsBlackAlg(Node<T>* LocalRoot,int FatherColor)
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
bool BRTree<T>::verifyThatEachSonOfRedNodeIsBlack()
{
    return verifyThatEachSonOfRedNodeIsBlackAlg(Root,black);
}
template <class T>
int BRTree<T>::getBlackHeightAlg(Node<T>* LocalRoot)
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
int BRTree<T>::getBlackHeight()
{
    return getBlackHeightAlg(Root);
}
template<class T>
int BRTree<T>::CountNodesWOneSonAlg(Node<T>* LocalRoot)
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
int BRTree<T>::CountNodesWOneSon()
{
    return CountNodesWOneSonAlg(Root);
}
