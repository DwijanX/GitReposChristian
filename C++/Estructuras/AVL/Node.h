#pragma once
#include <iostream>
#include <Windows.h>
using namespace std;

template <class T>
class Node
{
private:
    T* Data;
    int Factor;
    Node<T>* left;
    Node<T>* right;
public:
    Node(T* Data1,int Factor);
    ~Node();
    T* getData();
    int getFactor();
    void setFactor(int Factor);
    void addToFactor(int n);
    void setData(T* Data1);
    Node<T>*& getLeft();
    Node<T>*& getRight();
    void setLeft(Node<T>* left1);
    void setRight(Node<T>* right1);
    void show(void(*funcToShow)(T*));
};
template <class T>
Node<T>::Node(T* Data1,int Factor)
{
    Data=Data1;
    this->Factor=Factor;
    left=NULL;
    right=NULL;
}
template <class T>
Node<T>::~Node()
{
    delete Data;
    delete left;
    delete right;
}
template <class T>
T* Node<T>::getData()
{
    return Data;
}
template <class T>
int Node<T>::getFactor()
{
    return Factor;
}
template <class T>
void Node<T>::setFactor(int Factor)
{
    this->Factor=Factor;
}
template <class T>
void Node<T>::setData(T* Data1)
{
    Data=Data1;
}
template <class T>
Node<T>*& Node<T>::getLeft()
{
    return left;
}
template <class T>
Node<T>*& Node<T>::getRight()
{
    return right;
}
template <class T>
void Node<T>::setLeft(Node<T>* left1)
{
    left=left1;
}
template <class T>
void Node<T>::setRight(Node<T>* right1)
{
    right=right1;
}
template <class T>
void Node<T>::show(void(*funcToShow)(T*))
{
    funcToShow(Data);
}
template <class T>
void Node<T>::addToFactor(int n)
{
    Factor+=n;
}
