#pragma once
#include <iostream>
#include <Windows.h>
using namespace std;

template <class T>
class Node
{
private:
    T* Data;
    int color;
    Node<T>* left;
    Node<T>* right;
    void setConsoleColor(int textColor, int bgColor);
public:
    Node(T* Data1,int color1);
    ~Node();
    T* getData();
    int getColor();
    void setColor(int color1);
    void setData(T* Data1);
    Node<T>*& getLeft();
    Node<T>*& getRight();
    void setLeft(Node<T>* left1);
    void setRight(Node<T>* right1);
    void show(void(*funcToShow)(T*));
};
template <class T>
Node<T>::Node(T* Data1,int color1)
{
    Data=Data1;
    color=color1;
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
int Node<T>::getColor()
{
    return color;
}
template <class T>
void Node<T>::setColor(int color1)
{
    color=color1;
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
void Node<T>::setConsoleColor(int textColor, int bgColor)
{
      SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), (textColor + (bgColor * 16)));
}
template <class T>
void Node<T>::show(void(*funcToShow)(T*))
{
    setConsoleColor(color,0);
    funcToShow(Data);
    setConsoleColor(15,0);
}
